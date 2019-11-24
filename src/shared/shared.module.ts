import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class UserModule {}