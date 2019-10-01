import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { Mailer, SendEmailMessage } from 'src/common/mailer';
import { NestUtils } from 'src/common/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), Mailer],
  providers: [UsersService, SendEmailMessage, NestUtils],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, Mailer, NestUtils],
})
export class UsersModule {}
