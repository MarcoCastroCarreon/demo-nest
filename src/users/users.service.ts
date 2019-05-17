import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserInterface } from './interface/user.interface';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}

    async create(user: CreateUserDTO): Promise<UserInterface> {
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = user.password;
        newUser.enabled =  user.enabled;
        const savedUser = await this.userRepository.createUser(newUser);
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            password: savedUser.password,
            enabled: savedUser.enabled,
        };
    }
}
