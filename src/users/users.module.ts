import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { Mailer, SendEmailMessage } from 'src/common/mailer';
import { NestUtils } from 'src/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/mongo/models/user.model';
import { AuthenticationMiddleWare } from 'src/common/auth/middleware/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), TypeOrmModule.forFeature([UserRepository]), Mailer],
  providers: [UsersService, SendEmailMessage, NestUtils, UserRepository],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, Mailer, NestUtils, MongooseModule, UserRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleWare)
      .exclude(
        {
          path: 'users/login', method: RequestMethod.POST,
        },
      )
      .forRoutes(UsersController);
  }
}
