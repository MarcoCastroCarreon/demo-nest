import uuid = require('uuid');
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';
import { SendEmailMessage } from 'src/common/mailer';
import { ChangePassword } from './interface/change-password.interface';
import { RoleRepository } from 'src/repositories/role.repository';
import { UserRole } from 'src/entities/user-role.entity';
import { UserRoleRepository } from 'src/repositories/user-role.repository';
import { AsignRolesResponse } from './interface/asing-roles-response.interface';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private sendEmailService: SendEmailMessage,
        private roleRepository: RoleRepository,
        private userRoleRepository: UserRoleRepository
    ) {}

    async create(user: UserDTO): Promise<UserInterface> {
        const findUser = await this.userRepository.getByEmail(user.email);
        if(findUser && findUser.status === UserStatus.ENABLED || findUser && findUser.status === UserStatus.PENDING_ACCOUNT)
            throw new ConflictException(`user with email: {${user.email}} is already registered`);
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = user.password;
        newUser.status =  UserStatus.PENDING_ACCOUNT;
        newUser.token = uuid.v4(); 

        await this.sendEmailService.sendConfirmUserEmail(newUser.email, newUser.token, newUser.name);
        const savedUser = await this.userRepository.createUser(newUser);
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            status: savedUser.status
        };
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async findOneByToken(token: string): Promise<User> {
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

    async confirmUser(token: string): Promise<void> {
        const user = await this.userRepository.findByToken(token);
        if(!user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with ${JSON.stringify(token)} not found or disabled`);
        user.status = UserStatus.ENABLED;
        await this.userRepository.save(user);
    }

    async changeUserRole(id: number, role: UserRoleEnum[]): Promise<AsignRolesResponse> {
        const user = await this.userRepository.findById(id);
        if(!user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with id ${id} not found or disabled`);
        const roles = await this.roleRepository.getRole(role);
        const userRoles: UserRole[] = [];
        
        for(const rol of roles) {
            const userRole = new UserRole();
            userRole.user = user;
            userRole.role = rol;
            await this.userRoleRepository.saveUserRole(userRole);
            userRoles.push(userRole);
        }

        return {
            id: user.id,
            roles: userRoles
        };
    }
    async changePassword(id: number, data: ChangePassword): Promise<void> {
        const user = await this.userRepository.findById(id);
        if(!user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with id ${id} not found or disabled`);
        if(user.password != data.oldPassword)
            throw new ConflictException(`oldPassword and userPassword not equal`);
        await this.sendEmailService.sendChangePasswordEmail(user.email, user.name);
        user.password = data.password;
        await user.save();
    }
}
