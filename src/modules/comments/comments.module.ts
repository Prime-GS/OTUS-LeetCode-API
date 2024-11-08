import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Comment } from './entities'
import { CommentsService } from './services'
import { CommentsResolver } from './resolver'
import { TasksModule } from '../tasks/tasks.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TasksModule],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
})
export class CommentsModule {}
