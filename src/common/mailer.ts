import { MailerModule, HandlebarsAdapter, MailerService, ISendMailOptions } from '@nest-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { config } from 'dotenv';
config();
const password = process.env.EMAIL_PASSWORD;

export const Mailer = MailerModule.forRoot({
    transport: `smtps://mymmarck1997@gmail.com:${password}@smtp.gmail.com`,
    defaults: {
      from:'Mi App <mymmarck1997@gmail.com>',
    },
    template: {
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  })

@Injectable()
export class SendEmailMessage {
    constructor(public emailService: MailerService){}

    public async sendConfirmUserEmail(email: string, token: string, name: string) {
        const options : ISendMailOptions =  {
            to: email,
            subject: 'Token de Registro',
            text: 'Token',
            html: `<b>Bienvenida a Dulces Regionales(Orizaba) aqui esta tu codigo para autorizar tu registro, gracias por unirte a nosotros 
            codigo de registro: <strong>${token}</strong></b>`,
          };
        console.log('SEM');
        await this.emailService.sendMail(options)
          .then(result => {
              console.log(result);
          })
          .catch(error => {
              console.log(error);
              throw new InternalServerErrorException(`Mailer >-${error}-<`)
          });
    }

    public async sendChangePasswordEmail(email: string,  name: string) {
      const options : ISendMailOptions =  {
          to: email,
          subject: 'Cambio de Contraseña',
          text: 'Cambio de Contraseña',
          html: `<p>Su cambio de contraseña fue un exito! <strong>${name}</strong></p>`,
        }
      console.log('SEM');
      await this.emailService.sendMail(options)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            throw new InternalServerErrorException(`Mailer >-${error}-<`)
        })
  }
}