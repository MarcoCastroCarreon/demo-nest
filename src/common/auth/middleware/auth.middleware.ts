import jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response, ErrorRequestHandler } from 'express';
import { config } from 'dotenv';
import { UserRepository } from 'src/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

config();

const secret = process.env.JWT_SECRET;

@Injectable()
export class AuthenticationMiddleWare implements NestMiddleware {

    constructor(
        @InjectRepository(User) private userRepository: UserRepository,
    ) { }

    use(req: Request, res: Response, next: () => void) {
        Logger.log(`Middleware Start - Authentication`);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret, (err, decode) => {
                if (err) {
                    throw new UnauthorizedException('Token is not valid');
                }
                Logger.log(decode);
                const code = JSON.stringify(decode);
                const info = JSON.parse(code);
                const user = this.userRepository.findByIdAndType(info.userId, info.userType);
                if (!user)
                    throw new UnauthorizedException('Token is not valid');
            });
            Logger.log('Middleware End - Authentication');
            next();

        } else {
            throw new UnauthorizedException('Token is required');
        }
    }
}
