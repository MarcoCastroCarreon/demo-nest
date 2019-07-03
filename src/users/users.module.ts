import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { Mailer, SendEmailMessage } from 'src/common/mailer';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRoleRepository } from 'src/repositories/user-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository, UserRoleRepository]), Mailer],
  providers: [UsersService, SendEmailMessage],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, Mailer]
})
export class UsersModule {}
