import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { Comment } from '../entities'
import { CommentDTO } from '../dto'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'
import { User } from '../../users/entities'
import { TasksService } from '../../tasks/services'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly tasksService: TasksService,
  ) {}

  async findByTask(taskId: number, pagination?: IPaginationInput, filter?: IFilter): Promise<IListResponse<Comment>> {
    const [comments, total] = await this.commentsRepository.findAndCount({
      take: pagination?.limit ?? 50,
      skip: pagination?.offset,
      where: [{ title: ILike(`%${filter?.query ?? ''}%`), taskId }],
      order: { id: 'ASC' },
    })

    return {
      data: comments,
      total,
    }
  }

  async findByIdAnduserId(id: number, userId: number) {
    const comment = await this.commentsRepository.findOneBy({ id, userId })

    if (!comment) {
      throw new BadRequestException('Комментарий не найден')
    }

    return comment
  }

  async postComment(user: User, input: CommentDTO) {
    const task = await this.tasksService.findByIdOrFail(input.taskId)

    const comment = await this.commentsRepository.save(
      this.commentsRepository.create({
        title: input.title,
        taskId: input.taskId,
        task,
        userId: user.id,
        user,
      }),
    )

    return comment
  }

  async editComment(user: User, input: CommentDTO) {
    if (!input.id) {
      throw new BadRequestException('Комментарий не найден')
    }

    const comment = await this.findByIdAnduserId(input.id, user.id)
    comment.title = input.title
    return this.commentsRepository.save(comment)
  }

  async deleteComment(user: User, id: number): Promise<boolean> {
    const comment = await this.findByIdAnduserId(id, user.id)
    if (!comment) {
      return false
    }
    await this.commentsRepository.delete({ id })
    return true
  }
}
