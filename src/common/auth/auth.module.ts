import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { UsersModule } from '../../users/users.module';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';


@Module({
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'bearer'}), TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, HttpStrategy, UsersService],
  exports: [HttpStrategy, AuthService],
})
export class AuthModule {}
