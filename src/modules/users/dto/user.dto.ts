import { IsNotEmpty, IsString, IsOptional, IsArray, IsEmail } from 'class-validator'

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName?: string | null

  @IsOptional()
  @IsString()
  middleName?: string | null

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsArray()
  roles?: string[] | null
}
