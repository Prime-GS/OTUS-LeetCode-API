import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { Tag } from '../entities'
import { TagDTO, UpdateTagDTO } from '../dto'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async find(pagination?: IPaginationInput, filter?: IFilter): Promise<IListResponse<Tag>> {
    const [Tags, total] = await this.tagsRepository.findAndCount({
      take: pagination?.limit ?? 50,
      skip: pagination?.offset,
      where: [{ title: ILike(`%${filter?.query ?? ''}%`) }, { description: ILike(`%${filter?.query ?? ''}%`) }],
      order: { id: 'ASC' },
    })

    return {
      data: Tags,
      total,
    }
  }

  async findById(id: number) {
    const Tag = await this.tagsRepository.findOneBy({ id })

    return Tag
  }

  async findByIdOrFail(id: number) {
    const Tag = await this.findById(id)

    if (!Tag) {
      throw new BadRequestException('Пользователь не найден')
    }

    return Tag
  }

  async createTag(input: TagDTO) {
    const tagInstance = this.tagsRepository.create({
      title: input.title,
      description: input.description ?? null,
    })

    return this.tagsRepository.save(tagInstance)
  }

  async updateTag(input: UpdateTagDTO) {
    const tag = await this.findByIdOrFail(input.id)

    tag.title = input.title ?? tag.title
    tag.description = input.description ?? tag.description

    return this.tagsRepository.save(tag)
  }

  async deleteTag(id: number): Promise<boolean> {
    const tag = await this.tagsRepository.findOneBy({ id })
    if (!tag) {
      return false
    }

    await this.tagsRepository.delete({ id })

    return true
  }
}
