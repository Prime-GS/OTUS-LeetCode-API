import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class TagDTO {
  @IsOptional()
  @IsNumber()
  id?: number | null

  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string | null
}
