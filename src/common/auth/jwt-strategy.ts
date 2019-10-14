import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

config();

const secret = process.env.JWT_SECRET;
const salts = +process.env.PW_SALTS;

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        });
    }

    async validate(payload: JwtPayload) {
        Logger.log('Strategy Logger -' + payload.email);
        Logger.log('Strategy Logger -' + payload.password);

        const user = await this.userRepository.getByEmail(payload.email);
        if (!user) throw new UnauthorizedException(`Invalid email`);

        bcrypt.compare(payload.password, user.password, (err , same) => {
            if (err) throw new UnauthorizedException(`Wrong Password`);
        });

        return { email: payload.email };
    }
}
