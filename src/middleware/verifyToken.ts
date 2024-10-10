import {NestMiddleware} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

export class VerifyToken implements NestMiddleware {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {}
    async use(req: Request, res: Response, next: NextFunction) {
        let token: any = req.headers.token

        if(token == undefined) {
            res.send({
                success: false,
                message: "Give the token❗"
            })
            return
        }

        let {login} = token

        if(!login) {
            return {
                success: false,
                message: 'Wrong token❗'
            }
        }

        let check = await this.user.findOne({where: {login}})

        if(check.role != 'admin') {
            res.send({
                success: false,
                message: 'You are not able to do this💔'
            })
            return
        }else{
            next()
        }
    }
}