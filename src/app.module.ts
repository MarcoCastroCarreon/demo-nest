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

@Module({
  imports: [
    TasksModule, 
    ConnectionModule, 
    UsersModule, 
    AuthModule, 
    PassportModule, 
    TypeOrmModule, 
    Mailer
  ],
  controllers: [AppController, TasksController, UsersController],
  providers: [AppService, TasksService, UsersService, AuthService, SendEmailMessage],
})
export class AppModule {}
