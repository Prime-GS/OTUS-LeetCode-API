import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { Task } from '../entities'
import { TaskDTO } from '../dto'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'
import { TagsService } from '../../tags/services'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly tagsService: TagsService,
  ) {}

  async find(pagination?: IPaginationInput, filter?: IFilter): Promise<IListResponse<Task>> {
    const [tasks, total] = await this.tasksRepository.findAndCount({
      take: pagination?.limit ?? 50,
      skip: pagination?.offset,
      where: [{ title: ILike(`%${filter?.query ?? ''}%`) }, { description: ILike(`%${filter?.query ?? ''}%`) }],
      order: { id: 'ASC' },
    })

    return {
      data: tasks,
      total,
    }
  }

  async findById(id: number) {
    return this.tasksRepository.findOneBy({ id })
  }

  async findByIdOrFail(id: number) {
    const Task = await this.findById(id)

    if (!Task) {
      throw new BadRequestException('Тег не найден')
    }

    return Task
  }

  async createTask(input: TaskDTO) {
    const tags = await this.tagsService.findByIdsArr(input.tagsIds)

    return this.tasksRepository.save(
      this.tasksRepository.create({
        title: input.title,
        description: input.description,
        difficulty: input.difficulty,
        result: input.result,
        input: input.input ?? null,
        tags: tags,
      }),
    )
  }

  async updateTask(input: TaskDTO) {
    if (!input.id) {
      throw new BadRequestException('Тег не найден')
    }

    const task = await this.findByIdOrFail(input.id)

    const tags = await this.tagsService.findByIdsArr(input.tagsIds)

    task.title = input.title
    task.description = input.description
    task.difficulty = input.difficulty
    task.result = input.result
    task.input = input.input ?? null
    task.tags = tags

    return this.tasksRepository.save(task)
  }

  async deleteTask(id: number): Promise<boolean> {
    const Task = await this.tasksRepository.findOneBy({ id })
    if (!Task) {
      return false
    }

    await this.tasksRepository.delete({ id })

    return true
  }
}
