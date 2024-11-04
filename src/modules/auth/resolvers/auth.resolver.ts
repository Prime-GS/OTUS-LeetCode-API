import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { User } from '../../users/entities'
import { UserDTO } from '../../users/dto'
import { IAuthResponse } from '../interfaces'
import { AuthUser, CurrentUser } from '../decorators'
import { AuthService } from '../services'
import { LoginDTO } from '../dto'
import { UpdateUserDTO } from '../../users/dto/updateUser.dto'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query()
  @AuthUser()
  async me(@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Mutation()
  async login(@Args('input') input: LoginDTO): Promise<IAuthResponse> {
    return await this.authService.login(input)
  }

  @Mutation()
  async registration(@Args('input') input: UserDTO): Promise<IAuthResponse> {
    return await this.authService.registration(input)
  }

  @Mutation()
  @AuthUser()
  async updateMyProfile(@Args('input') input: UpdateUserDTO): Promise<User> {
    return await this.authService.updateMyProfile(input)
  }

  @Mutation()
  forgotPassword(@Args('email') email: string) {
    return this.authService.sendVerificationCode(email)
  }

  @Mutation()
  verifyToken(@Args('token') token: string) {
    return this.authService.verifyToken(token)
  }

  @Mutation()
  resetPassword(@Args('token') token: string, @Args('newPassword') newPassword: string) {
    return this.authService.resetPassword(token, newPassword)
  }
}
