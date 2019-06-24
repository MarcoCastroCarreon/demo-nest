import { Controller, Get, HttpCode, Post, Body, UseGuards, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { filter } from 'src/common/enums/user-status.enum';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    // @UseGuards(AuthGuard('bearer'))
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

    @Get(':id')
    @HttpCode(200)
    getUserById(@Param('id') id: number) {
        const user =  this.userService.findById(id);
        return user;
    }

    @Put(':id')
    @HttpCode(204)
    async updateUserStatus(@Param('id') id: number, @Body() status: string): Promise<void> {
        if(!status || !filter(status))
            throw new BadRequestException(`status ${status} not exist`);
        await this.userService.changeUserStatus(id, filter(status));
    }

    @Put('/confirm/:token')
    @HttpCode(204)
    async confirmUser(@Param('token') token: string): Promise<void> {
        console.log(token);
        await this.userService.confirmUser(token);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
