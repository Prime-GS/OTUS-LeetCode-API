import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class TemplatesService {
  constructor(private readonly configService: ConfigService) {}

  parse(message: string, params: { [key: string]: string }) {
    return message.replace(/\{\{(.*?)\}\}/g, (i, match) => params[match])
  }

  parseFromFile(fileName: string, params: { [key: string]: string }) {
    const templatesDir = this.configService.get<string>('TEMPLATES_DIR')
    const message = fs.readFileSync(path.join(`${templatesDir}`, fileName), {
      encoding: 'utf8',
    })

    return this.parse(message, params)
  }
}
