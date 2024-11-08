import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'

export class CommentDTO {
  @IsOptional()
  @IsNumber()
  id?: number | null

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  taskId: number
}
