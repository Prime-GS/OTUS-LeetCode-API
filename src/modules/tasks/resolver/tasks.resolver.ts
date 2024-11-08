import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'

import { Task } from '../entities'
import { TasksService } from '../services'
import { TaskDTO } from '../dto'
import { AuthUser, Roles, UserRole } from '../../auth/decorators'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'

@Resolver('Task')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query()
  @AuthUser()
  tasks(
    @Args('pagination') pagination?: IPaginationInput,
    @Args('filter') filter?: IFilter,
  ): Promise<IListResponse<Task>> {
    return this.tasksService.find(pagination, filter)
  }
  @Query()
  @AuthUser()
  task(@Args('id') id: number) {
    return this.tasksService.findById(id)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  createTask(@Args('input') input: TaskDTO) {
    return this.tasksService.createTask(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  updateTask(@Args('input') input: TaskDTO) {
    return this.tasksService.updateTask(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  deleteTask(@Args('id') id: number) {
    return this.tasksService.deleteTask(id)
  }
}
