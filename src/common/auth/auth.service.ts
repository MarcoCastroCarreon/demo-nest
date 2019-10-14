import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtPayload } from './interfaces/jwt-payload';
import { UserLoginBody } from 'src/users/interface/user.interface';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: UserRepository,
        ) { }

    async validateUser(payload: JwtPayload) {
        const user = await this.userRepository.getByEmail(payload.email);
        if (!user)
            throw new NotFoundException(`user with email ${payload.email} not found`);

        return user;
    }

    async login(payload: UserLoginBody) {
        const user = await this.userRepository.getByEmail(payload.email);
        if (!user)
            throw new NotFoundException(`user with email ${payload.email} not found`);

        const expiresIn = '1h';
        const accessToken = jwt.sign(payload, secret, { expiresIn });

        return {
            access_token: accessToken,
            expiresIn,
        };
    }
}
