import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { FileUpload } from 'graphql-upload-minimal'
import { ConfigService } from '@nestjs/config'

import { FileService } from './file.service'
import { FileType } from './enums'
import { FileEntity } from './entities'

import { AuthUser } from '../auth/decorators'
import { StorageService } from '../storage/storage.service'

@Resolver('File')
export class FileResolver {
  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  @ResolveField('url')
  url(@Parent() file: FileEntity): string {
    const storageUrl = this.configService.get<string>('STORAGE_URL')

    return `${storageUrl}${file.path}.${file.extension}`
  }

  @Mutation()
  @AuthUser()
  async singleFileUpload(@Args('file') file: FileUpload, @Args('type') type: FileType) {
    const response = await this.storageService.uploadFile(file, {
      dir: `uploads/${type === FileType.image ? 'images' : 'files'}`,
    })

    return this.fileService.create(response, type)
  }

  @Mutation()
  @AuthUser()
  async deleteFile(@Args('path') path: string, @Args('id') id: number) {
    this.storageService.deleteFile(path)

    return this.fileService.delete(id)
  }
}
