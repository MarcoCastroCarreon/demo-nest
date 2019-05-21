import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {SECRET} from '../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService) {}

    async use(req: Request, res: Response, next: NextFunction){
        const authHeaders = req.headers.authorization;
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token =  (authHeaders as string).split(' ')[1];
            const decoded: any = jwt.verify(token, SECRET);
            const user = await this.userService
        }
    }
}
