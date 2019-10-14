import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginBody } from 'src/users/interface/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @HttpCode(201)
    async login(@Body() payload: UserLoginBody) {
        const res = await this.authService.login(payload);
        return res;
    }

}
