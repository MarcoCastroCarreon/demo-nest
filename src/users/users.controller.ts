import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interface/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() user: CreateUserDTO): Promise<UserInterface> {
        const savedUser = this.userService.create(user)
        return savedUser;
    }
}
