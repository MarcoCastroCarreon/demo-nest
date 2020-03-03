import { Controller, Get, HttpCode, Post, Body, Param, Put, Delete, BadRequestException, Logger, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface, UserLoginBody, UserLoginReponse, UserGetAllResponse, UpdateUserStatus } from './interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { filter } from 'src/common/enums/user-status.enum';
import { ChangePassword } from './interface/change-password.interface';
import { parseRole } from 'src/common/enums/user-role.enum';
import { NestUtils } from 'src/common/utils';
import { AuthGuard } from '@nestjs/passport';
import { config } from 'dotenv';

config();

const AUTH_GUARD_TYPE = process.env.AUTH_GUARD_TYPE;

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private nestUtils: NestUtils,
    ) { }

    @Post()
    @HttpCode(201)
    // @UseGuards(AuthGuard(AUTH_GUARD_TYPE))
    async create(@Body() user: UserDTO): Promise<UserInterface> {
        const { userType, name } = user;
        Logger.log(user);
        const gotNumbers = await this.nestUtils.checkString(name);
        if (!userType || userType && !parseRole(userType))
            throw new BadRequestException(`userType ${userType} is not valid`);

        if (!name) throw new BadRequestException(`name can't be null`);

        if (gotNumbers)
            throw new BadRequestException(`name ${name} can't contain numbers`);

        const savedUser = this.userService.create(user);
        return savedUser;
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard(AUTH_GUARD_TYPE))
    getAll(): Promise<UserGetAllResponse[]> {
        const users = this.userService.findAll();
        return users;
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard(AUTH_GUARD_TYPE))
    getUserById(@Param('id') id: number) {
        const user = this.userService.findById(id);
        return user;
    }

    @Put(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard(AUTH_GUARD_TYPE))
    async updateUserStatus(@Param('id') id: number, @Body() req: UpdateUserStatus): Promise<void> {
        if (!id || isNaN(id))
            throw new BadRequestException(`id ${id} does not have a valid format`);
        if (!req.status || !filter(req.status))
            throw new BadRequestException(`status ${req.status} not exist`);
        await this.userService.changeUserStatus(id, filter(req.status));
    }

    @Put('confirm/token')
    @HttpCode(204)
    async confirmUser(@Headers('token') token: string): Promise<void> {
        Logger.log(token);
        await this.userService.confirmUser(token);
    }

    @Put('change-password/:id')
    @HttpCode(204)
    async changePassword(@Param('id') id: number, @Body() password: ChangePassword): Promise<void> {
        if (password.oldPassword === password.password)
            throw new BadRequestException(`oldPassword and newPassword cant'be equal`);
        await this.userService.changePassword(id, password);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard(AUTH_GUARD_TYPE))
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }

}
