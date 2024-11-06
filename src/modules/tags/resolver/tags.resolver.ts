import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'

import { Tag } from '../entities'
import { TagsService } from '../services'
import { TagDTO, UpdateTagDTO } from '../dto'
import { AuthUser, Roles, UserRole } from '../../auth/decorators'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'

@Resolver('Tag')
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query()
  @AuthUser()
  Tags(
    @Args('pagination') pagination?: IPaginationInput,
    @Args('filter') filter?: IFilter,
  ): Promise<IListResponse<Tag>> {
    return this.tagsService.find(pagination, filter)
  }
  @Query()
  @AuthUser()
  Tag(@Args('id') id: number) {
    return this.tagsService.findById(id)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  createTag(@Args('input') input: TagDTO) {
    return this.tagsService.create(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  updateTag(@Args('input') input: UpdateTagDTO) {
    return this.tagsService.updateProfile(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  deleteTag(@Args('id') id: number) {
    return this.tagsService.deleteTag(id)
  }
}
