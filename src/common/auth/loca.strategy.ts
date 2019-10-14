import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UnauthorizedException, Request } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload';

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(@Request() req) {

        const user = await this.authService.validateUser(req.user);
        if (!user)
         throw new UnauthorizedException(); 
        
        return user;
    }
}
