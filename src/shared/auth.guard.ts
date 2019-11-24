import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../roles/roles.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private ctx: any;
    private roles: string [];
    private request: any;
    private isAuthorized: boolean = false;

    constructor(
        private readonly reflector: Reflector,
        private authService: AuthService,
        private roleService: RoleService
        ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.request = context.switchToHttp().getRequest();
        this.roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(this.request) {
            if(!this.request.headers.authorization) {
                return false;
            }
            this.request.user = await this.authService.validateToken(this.request.headers.authorization);
            if (!this.roles) {
                return true;
            }
            return true;
        } else {
            this.ctx = GqlExecutionContext.create(context).getContext();
            if(!this.ctx.headers.authorization) {
                return false;
            }
            this.ctx.user = await this.authService.validateToken(this.ctx.headers.authorization); 

            if (!this.roles) {
                return true;
            } else {
                const userRoles = await this.roleService.findRolesByUserId(this.ctx.user._id);
                this.isAuthorized = this.roles.some((role) => userRoles.includes(role));
                return this.isAuthorized;
            }
        }
    }
}