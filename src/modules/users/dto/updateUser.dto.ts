import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  firstName?: string | null

  @IsOptional()
  @IsString()
  lastName?: string | null

  @IsOptional()
  @IsString()
  middleName?: string | null

  @IsOptional()
  @IsString()
  password?: string | null

  @IsOptional()
  @IsString()
  email?: string | null
}
