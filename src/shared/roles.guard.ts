import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    // accessing metadata key value 
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // gaunamos visos roles kurioms leidziama prieiti prie endpoint
    // pvz 'admin', 'moderator'

    // decodinam jwt ir user objecte gaunam role 

    // jeigu role admin return true

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    console.log('request', request);

    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}