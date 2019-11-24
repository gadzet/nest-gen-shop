import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt  from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(request) {
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
            console.log('secret', process.env.SECRET);
            return await jwt.verify(token, process.env.SECRET);
        } catch (err) {
            throw new HttpException(`Token error: ${err.message || err.name}`, HttpStatus.FORBIDDEN);
        }
    }

}