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
import { AuthModule } from './common/auth/auth.module';
import { AuthController } from './common/auth/auth.controller';
import { AuthService } from './common/auth/auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/auth/jwt-strategy';
import { LocalStrategy } from './common/auth/loca.strategy';
import { config } from 'dotenv';

config();

const secret = process.env.JWT_SECRET;

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
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController, UsersController, SalesController, AuthController],
  providers: [AppService, UsersService, SendEmailMessage, SalesService, NestUtils, AuthService, LocalStrategy],
})
export class AppModule { }
