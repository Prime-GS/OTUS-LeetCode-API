import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from 'class-validator'
import { TaskDifficulty } from '../enum'

export class TaskDTO {
  @IsOptional()
  @IsNumber()
  id?: number | null

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  difficulty: TaskDifficulty

  @IsOptional()
  @IsString()
  input?: string | null

  @IsNotEmpty()
  @IsString()
  result: string

  @IsNotEmpty()
  @IsArray()
  tagsIds: number[]
}
