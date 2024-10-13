import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

export class VerifyToken implements NestMiddleware {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {}
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let token: any = req.headers.token
            
            if(token == undefined) {
                res.send({
                    success: false,
                    message: "Smth gets wrong❗"
                })
                return
            }
            
            let verifyToken: any = verify(token, 'secret_key')
            let {id} = verifyToken
            
            if(!id) {
                return {
                    success: false,
                    message: 'You are not an admin❗'
                }
            }
            
            let check = await this.user.findOne({where: {id}})

            if(check.role != 'admin') {
                res.send({
                    success: false,
                    message: 'You are not able to do this💔'
                })
                return
            }else{
                req['user'] = check
                next()
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    }
}
