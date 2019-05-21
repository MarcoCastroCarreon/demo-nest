import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/common/enums/user-status.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}

    async create(user: UserDTO): Promise<UserInterface> {
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = user.password;
        newUser.status =  UserStatus.PENDING_ACCOUNT;
        const savedUser = await this.userRepository.createUser(newUser);
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            password: savedUser.password,
            status: savedUser.status,
        };
    }

    async findById(id: number) {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async findOneByToken(token: string) {
        return await this.userRepository.findByToken(token);
    }

    async findAll(): Promise<UserInterface[]> {
        const allUsers = await this.userRepository.findAll();

        const all = allUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            status: user.status,
            token: user.token ? user.token : null,
        }))
        return all;
    }
}
