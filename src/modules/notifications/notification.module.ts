import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { NotificationService } from './notification.service'
import { TemplatesService } from './template.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('SMTP_HOST'),
            port: Number(configService.get<string>('SMTP_PORT')),
            secure: configService.get<string>('SMTP_SECURE') === 'true',
            auth: {
              user: configService.get<string>('SMTP_USER'),
              pass: configService.get<string>('SMTP_PASSWORD'),
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: `"Kansonar" <${configService.get<string>('SMTP_USER')}>`,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [NotificationService, TemplatesService],
  exports: [NotificationService, TemplatesService],
})
export class NotificationModule {}
