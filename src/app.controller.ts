import { Controller, Get, Post, HttpCode, Request, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './common/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginBody } from './users/interface/user.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    ) {}
  
  @Post('auth/login')
  @HttpCode(201)
  async login(@Body() req: UserLoginBody) {
    return await this.authService.login(req);
  }
}
