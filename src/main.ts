import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { graphqlUploadExpress } from 'graphql-upload-minimal'
import * as fs from 'fs'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)

  app.enableCors()

  app.use(
    graphqlUploadExpress({
      maxFileSize: 1024 * 1024 * 8, // 8 MB
      maxFiles: 10,
    }),
  )

  // Storage
  const storageRoot = configService.get<string>('STORAGE_ROOT')

  if (!storageRoot || !fs.existsSync(storageRoot)) {
    throw new Error('Storage root does not exist')
  }

  app.useStaticAssets(storageRoot, {
    prefix: '/storage',
  })

  await app.listen(8080)
}
bootstrap()
