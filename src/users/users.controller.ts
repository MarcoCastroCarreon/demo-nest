import { Controller, Get, HttpCode, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @HttpCode(201)
    create(@Body() user: UserDTO): Promise<UserInterface> {
        const savedUser = this.userService.create(user);
        return savedUser;
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    @HttpCode(200)
    getAll(): Promise<UserInterface[]> {
        const users = this.userService.findAll();
        return users;
    }
}
