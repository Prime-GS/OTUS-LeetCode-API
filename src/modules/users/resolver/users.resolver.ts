import { Resolver, Args, Mutation, Query, ResolveField, Parent } from '@nestjs/graphql'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'
import { AuthUser, CurrentUser, Roles, UserRole } from '../../auth/decorators'
import { UsersService } from '../services'
import { User } from '../entities'
import { UserDTO } from '../dto'
import { UpdateUserDTO } from '../dto/updateUser.dto'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @AuthUser()
  users(
    @Args('pagination') pagination?: IPaginationInput,
    @Args('filter') filter?: IFilter,
  ): Promise<IListResponse<User>> {
    return this.usersService.find(pagination, filter)
  }
  @ResolveField()
  async fullName(@Parent() user: User) {
    const { firstName, lastName, middleName } = user
    return firstName + (lastName ? ` ${lastName}` : '') + (middleName ? ` ${middleName}` : '')
  }

  @Query()
  @AuthUser()
  user(@Args('id') id: number) {
    return this.usersService.findById(id)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  createUser(@Args('input') input: UserDTO) {
    return this.usersService.create(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  updateUser(@Args('input') input: UpdateUserDTO, @CurrentUser() user: User) {
    input.id = user.id
    return this.usersService.updateProfile(input)
  }

  @Mutation()
  @AuthUser()
  @Roles(UserRole.admin)
  deleteUser(@Args('id') id: number) {
    return this.usersService.deleteUser(id)
  }
}
