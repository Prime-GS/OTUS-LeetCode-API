import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Task } from './entities'
import { TasksService } from './services'
import { TasksResolver } from './resolver'
import { TagsModule } from '../tags/tags.module'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TagsModule],
  providers: [TasksService, TasksResolver],
  exports: [TasksService],
})
export class TasksModule {}
