import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileType } from './enums'

import { IUploadResponse } from '../storage/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { FileEntity } from './entities'

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(values: IUploadResponse, type: FileType) {
    // return { values, type }
    return this.fileRepository.save(this.fileRepository.create({ ...values, type }))
  }

  async delete(id: number) {
    const file = await this.fileRepository.findOneBy({ id })
    if (!file) {
      return false
    }

    await this.fileRepository.delete({ id })

    return true
  }

  findByIds(ids: number[]) {
    return this.fileRepository.findBy({ id: In(ids) })
  }
}
