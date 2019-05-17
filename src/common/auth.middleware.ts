import { Injectable, NestMiddleware } from '@nestjs/common';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService) {}
}