import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { ConnectionModule } from './common/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './common/auth/auth.service';
import { AuthModule } from './common/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mailer, SendEmailMessage } from './common/mailer';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales/sales.service';
import { SalesModule } from './sales/sales.module';
import { MongoModule } from './common/mongoConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { NestUtils } from './common/utils';

@Module({
  imports: [
    TasksModule, 
    ConnectionModule, 
    UsersModule, 
    AuthModule, 
    PassportModule, 
    TypeOrmModule, 
    Mailer, 
    SalesModule,
    MongoModule,
    MongooseModule,
    NestUtils,
  ],
  controllers: [AppController, TasksController, UsersController, SalesController],
  providers: [AppService, TasksService, UsersService, AuthService, SendEmailMessage, SalesService, NestUtils],
})
export class AppModule {}
