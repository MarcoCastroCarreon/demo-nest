import uuid = require('uuid');
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Injectable, ConflictException, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDTO } from './dto/user.dto';
import { UserInterface, UserModel, UserLoginReponse, UserGetAllResponse } from './interface/user.interface';
import { User } from 'src/entities/user.entity';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { SendEmailMessage } from 'src/common/mailer';
import { ChangePassword } from './interface/change-password.interface';
import { parseRole } from 'src/common/enums/user-role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'dotenv';

config();

const jwtSecret = process.env.JWT_SECRET;
const salts = process.env.PW_SALTS;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private sendEmailService: SendEmailMessage,
        @InjectModel('User') private userModel: Model<UserModel>,
    ) { }

    async create(user: UserDTO): Promise<UserInterface> {
        const findUser = await this.userRepository.getByEmail(user.email);
        if (findUser && findUser.status === UserStatus.ENABLED || findUser && findUser.status === UserStatus.PENDING_ACCOUNT)
            throw new ConflictException(`user with email: {${user.email}} is already registered`);
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.status = UserStatus.PENDING_ACCOUNT;
        newUser.userType = parseRole(user.userType);
        newUser.token = uuid.v4();
        newUser.creationDate = moment(moment.now(), 'x').toDate();

        bcrypt.genSalt(+salts, (err, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) throw new InternalServerErrorException(`Error encrypting password`);
                newUser.password = hash;
            });
        });

        const mongoUser = new this.userModel();

        mongoUser.mySqlId = newUser.id;
        mongoUser.userType = parseRole(user.userType);

        await this.sendEmailService.sendConfirmUserEmail(newUser.email, newUser.token, newUser.name);
        const savedUser = await this.userRepository.createUser(newUser);
        await mongoUser.save();
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            status: savedUser.status,
        };
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException(`user with id ${id} not found`);
        return user;
    }

    async findOneByToken(token: string): Promise<User> {
        return await this.userRepository.findByToken(token);
    }

    async findAll(): Promise<UserGetAllResponse[]> {
        const allUsers = await this.userRepository.findAll();

        const all = allUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
        }));
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
        if (!user)
            throw new ConflictException(`user with token ${token} not found, DISABLED or already ENABLED`);
        user.status = UserStatus.ENABLED;
        await this.userRepository.saveUser(user);
    }

    async changePassword(id: number, data: ChangePassword): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (user || user && user.status === UserStatus.DISABLED)
            throw new ConflictException(`user with id ${id} not found or disabled`);
        if (user.password !== data.oldPassword)
            throw new ConflictException(`oldPassword and userPassword not equal`);
        await this.sendEmailService.sendChangePasswordEmail(user.email, user.name);
        user.password = data.password;
        await this.userRepository.saveUser(user);
    }

    async findByEmailAndLogin(email: string, password: string): Promise<UserLoginReponse> {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new NotFoundException(`user with email ${email} not found`);

        bcrypt.compare(password, user.password, (err, same) => {
            if (err) throw new ConflictException(`incorrect password`);
        });

        const token = jwt.sign({ username: email, password: user.password }, jwtSecret);
        return {
            access_token: token,
        };
    }
}
