import { In, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'

import { Tag } from '../entities'
import { TagDTO } from '../dto'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async find(pagination?: IPaginationInput, filter?: IFilter): Promise<IListResponse<Tag>> {
    const [tags, total] = await this.tagsRepository.findAndCount({
      take: pagination?.limit ?? 50,
      skip: pagination?.offset,
      where: [{ title: ILike(`%${filter?.query ?? ''}%`) }, { description: ILike(`%${filter?.query ?? ''}%`) }],
      order: { id: 'ASC' },
    })

    return {
      data: tags,
      total,
    }
  }

  async findById(id: number) {
    return await this.tagsRepository.findOneBy({ id })
  }

  async findByIdOrFail(id: number) {
    const Tag = await this.findById(id)

    if (!Tag) {
      throw new BadRequestException('Тег не найден')
    }

    return Tag
  }

  async findByIdsArr(ids: number[]) {
    const tags = this.tagsRepository.find({
      where: {
        id: In(ids),
      },
    })
    return tags
  }

  async createTag(input: TagDTO) {
    return this.tagsRepository.save(
      this.tagsRepository.create({
        title: input.title,
        description: input.description ?? null,
      }),
    )
  }

  async updateTag(input: TagDTO) {
    if (!input.id) {
      throw new BadRequestException('Тег не найден')
    }

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
