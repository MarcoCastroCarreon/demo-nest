import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(token: string): Promise<User> {
    return await this.usersService.findOneByToken(token);
  }
}
