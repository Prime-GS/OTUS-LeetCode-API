import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class UpdateTagDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  title?: string | null

  @IsOptional()
  @IsString()
  description?: string | null
}
