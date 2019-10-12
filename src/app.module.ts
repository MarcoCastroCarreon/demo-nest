import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './common/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mailer, SendEmailMessage } from './common/mailer';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales/sales.service';
import { SalesModule } from './sales/sales.module';
import { MongoModule } from './common/mongoConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { NestUtils } from './common/utils';
import { AuthenticationMiddleWare } from './common/auth/middleware/auth.middleware';

@Module({
  imports: [ 
    ConnectionModule, 
    UsersModule,  
    PassportModule, 
    TypeOrmModule,
    Mailer, 
    SalesModule,
    MongoModule,
    MongooseModule,
    NestUtils,
  ],
  controllers: [AppController, UsersController, SalesController],
  providers: [AppService, UsersService, SendEmailMessage, SalesService, NestUtils],
})
export class AppModule { }
