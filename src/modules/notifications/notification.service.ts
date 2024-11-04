import { ConfigService } from '@nestjs/config'
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface'
import { Injectable } from '@nestjs/common'

import { TemplatesService } from './template.service'

@Injectable()
export class NotificationService {
  private readonly cabinerUrl: string

  constructor(
    private readonly mailerService: MailerService,
    private readonly templatesService: TemplatesService,
    private readonly configService: ConfigService,
  ) {
    const cabinerUrl = this.configService.get<string>('CABINET_URL')
    if (cabinerUrl) {
      this.cabinerUrl = cabinerUrl
    }
  }

  async sendMail(options: ISendMailOptions) {
    try {
      await this.mailerService.sendMail(options)
    } catch (error) {
      console.log(error)
    }
  }

  sendResetPasswordEmail(
    to: string | Address | Array<string | Address>,
    fullname: string,
    code: string | number,
    url: 'CABINET_URL',
  ) {
    const baseUrl = this.configService.get<string>(url)
    const subject = 'Восстановление пароля'

    return this.sendMail({
      to,
      subject,
      html: this.templatesService.parseFromFile('user-reset-password.html', {
        url: `${baseUrl}auth/reset-password/${code}`,
        fullname,
      }),
    })
  }

  sendUserConfirmationToken(to: string | Address | Array<string | Address>, fullname: string, code: string | number) {
    const baseUrl = this.cabinerUrl
    const subject = 'Подтверждение почты'

    return this.sendMail({
      to,
      subject,
      html: this.templatesService.parseFromFile('user-confirm-email.html', {
        url: `${baseUrl}auth/confirmation/${code}`,
        fullname,
      }),
    })
  }
}
