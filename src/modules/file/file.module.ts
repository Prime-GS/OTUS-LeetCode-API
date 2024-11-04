import { Global, Module } from '@nestjs/common'

import { FileResolver } from './file.resolver'
import { FileService } from './file.service'
import { FileEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
