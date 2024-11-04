import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, IsNull, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities'
import { UserDTO } from '../dto'
import { UpdateUserDTO } from '../dto/updateUser.dto'
import { IFilter, IListResponse, IPaginationInput } from '../../../common/interfaces'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async find(pagination?: IPaginationInput, filter?: IFilter): Promise<IListResponse<User>> {
    const [users, total] = await this.usersRepository.findAndCount({
      take: pagination?.limit ?? 50,
      skip: pagination?.offset,
      where: [
        { firstName: ILike(`%${filter?.query ?? ''}%`), roles: IsNull() },
        { lastName: ILike(`%${filter?.query ?? ''}%`), roles: IsNull() },
        { middleName: ILike(`%${filter?.query ?? ''}%`), roles: IsNull() },
        { email: ILike(`%${filter?.query ?? ''}%`), roles: IsNull() },
      ],
      order: { id: 'ASC' },
    })

    return {
      data: users,
      total,
    }
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id })

    return user
  }

  async findByIdOrFail(id: number) {
    const user = await this.findById(id)

    if (!user) {
      throw new BadRequestException('Пользователь не найден')
    }

    return user
  }

  async findByEmail(email?: string) {
    const user = await this.usersRepository.findOneBy({ email })

    return user
  }

  async findByEmailOrFail(email: string) {
    const user = await this.usersRepository.findOneBy({ email })

    if (!user) {
      throw new BadRequestException('Пользователь не найден')
    }

    return user
  }

  async create(input: UserDTO) {
    const isTaken = !!(await this.findByEmail(input.email))

    if (isTaken) {
      throw new BadRequestException(`${input.email} уже занят`)
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const userInstance = this.usersRepository.create({
      firstName: input.firstName,
      lastName: input.lastName ?? null,
      middleName: input.middleName ?? null,
      email: input.email,
      password: hashedPassword,
      roles: input.roles,
    })

    return this.usersRepository.save(userInstance)
  }

  async updateProfile(input: UpdateUserDTO) {
    const user = await this.findByIdOrFail(input.id)

    if (!!input.email && user.email !== input.email) {
      const isTaken = !!(await this.findByEmail(input.email ?? undefined))
      if (isTaken) {
        throw new BadRequestException(`${input.email} уже занят`)
      }
    }

    if (input.password && input.password?.length > 0) {
      const hashedPassword = await bcrypt.hash(input.password, 10)
      user.password = hashedPassword
    }

    user.firstName = input.firstName ?? user.firstName
    user.lastName = input.lastName ?? user.lastName
    user.middleName = input.middleName ?? user.middleName
    user.email = input.email ?? user.email

    return this.usersRepository.save(user)
  }

  async changePassword(password: string, user: User) {
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword

    return this.usersRepository.save(user)
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) {
      return false
    }

    await this.usersRepository.delete({ id })

    return true
  }
}
