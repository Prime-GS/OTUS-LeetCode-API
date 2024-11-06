import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tag } from './entities'
import { TagsService } from './services'
import { TagsResolver } from './resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
