import { MailerModule, HandlebarsAdapter, MailerService, ISendMailOptions } from '@nest-modules/mailer';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { config } from 'dotenv';
config();
const user = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;

export const Mailer = MailerModule.forRoot({
  transport: `smtps://${user}:${password}@smtp.gmail.com`,
  defaults: {
    from: 'Mi App <mcastrodevelopment@gmail.com>',
  },
  template: {
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});

@Injectable()
export class SendEmailMessage {
  constructor(public emailService: MailerService) { }

  public async sendConfirmUserEmail(email: string, token: string, name: string) {
    const options: ISendMailOptions = {
      to: email,
      subject: 'Token de Registro',
      text: 'Token',
      html: `<b>Bienvenid@ <strong>${name}</strong> a Dulces Regionales(Orizaba) aqui esta tu codigo para autorizar tu registro, gracias por unirte a nosotros 
            codigo de registro: <strong>${token}</strong></b>`,
    };
    Logger.log('SEM');
    await this.emailService.sendMail(options)
      .then(result => {
        Logger.log(result);
      })
      .catch(error => {
        Logger.log(error);
        throw new InternalServerErrorException(`Mailer >-${error}-<`);
      });
  }

  public async sendChangePasswordEmail(email: string, name: string) {
    const options: ISendMailOptions = {
      to: email,
      subject: 'Cambio de Contraseña',
      text: 'Cambio de Contraseña',
      html: `<p>Su cambio de contraseña fue un exito! <strong>${name}</strong></p>`,
    };
    Logger.log('SEM');
    await this.emailService.sendMail(options)
      .then(result => {
        Logger.log(result);
      })
      .catch(error => {
        Logger.log(error);
        throw new InternalServerErrorException(`Mailer >-${error}-<`);
      });
  }
}
