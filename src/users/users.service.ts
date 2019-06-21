import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/common/enums/user-status.enum';
import uuid = require('uuid');
import { UserRole } from 'src/entities/user-role.entity';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}

    async create(user: UserDTO): Promise<string> {
        const findUser = await this.userRepository.getByEmail(user.email);
        if(findUser && findUser.status === UserStatus.ENABLED || findUser && findUser.status === UserStatus.PENDING_ACCOUNT)
            throw new ConflictException(`user with email: {${user.email}} is already registered`);
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = user.password;
        newUser.status =  UserStatus.PENDING_ACCOUNT;
        newUser.token = uuid.v4(); 
        const savedUser = await this.userRepository.createUser(newUser);
        const token = `token: ${savedUser.token}`;
        return token;
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

    async changeUserStatus(id: number, status: UserStatus): Promise<UserInterface> {
        const user = await this.userRepository.findById(id);
        user.status = status;
        await this.userRepository.saveUser(user);
        return user;
    }

    async deleteUser(id: number): Promise<UserInterface> {
        const user = await this.userRepository.findById(id);
        return await this.userRepository.deleteUser(user);
    }

    async confirmUser(token: string) {
        const user = await this.userRepository.findByToken(token);
        if(!user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with ${JSON.stringify(token)} not found or disabled`);
        user.status = UserStatus.ENABLED;
        await this.userRepository.save(user);
    }

    async changeUserRole(id: number, role: UserRoleEnum) {
        const user = await this.userRepository.findById(id);
        if(!user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with id ${id} not found or disabled`);
        
    }
}
