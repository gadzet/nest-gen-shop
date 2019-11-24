import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt  from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private config: ConfigService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(request) {
            console.log('request', request);
            if(!request.headers.authorization) {
                return false;
            }
            request.user = await this.validateToken(request.headers.authorization);
            return true;
        } else {
            const ctx: any = GqlExecutionContext.create(context).getContext();
            if(!ctx.headers.authorization) {
                return false;
            }
            ctx.user = await this.validateToken(ctx.headers.authorization); 
            return true;
        }
    }

    async validateToken(auth: string) {        
        if(auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];
        try {
            return await jwt.verify(token, this.config.getSecret);
        } catch (err) {
            throw new HttpException(`Token error: ${err.message || err.name}`, HttpStatus.FORBIDDEN);
        }
    }

}