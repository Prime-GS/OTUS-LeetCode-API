import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'

import { Comment } from '../entities'
import { CommentsService } from '../services'
import { CommentDTO } from '../dto'
import { AuthUser, CurrentUser } from '../../auth/decorators'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'
import { User } from '../../users/entities'

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query()
  @AuthUser()
  commentsByTask(
    @Args('taskId') taskId: number,
    @Args('pagination') pagination?: IPaginationInput,
    @Args('filter') filter?: IFilter,
  ): Promise<IListResponse<Comment>> {
    return this.commentsService.findByTask(taskId, pagination, filter)
  }

  @Query()
  @AuthUser()
  comment(@CurrentUser() user: User, @Args('id') id: number) {
    return this.commentsService.findByIdAnduserId(user.id, id)
  }

  @Mutation()
  @AuthUser()
  postComment(@CurrentUser() user: User, @Args('input') input: CommentDTO) {
    return this.commentsService.postComment(user, input)
  }

  @Mutation()
  @AuthUser()
  editComment(@CurrentUser() user: User, @Args('input') input: CommentDTO) {
    return this.commentsService.editComment(user, input)
  }

  @Mutation()
  @AuthUser()
  deleteComment(@CurrentUser() user: User, @Args('id') id: number) {
    return this.commentsService.deleteComment(user, id)
  }
}
