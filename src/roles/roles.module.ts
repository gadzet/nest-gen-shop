import { Module, forwardRef } from '@nestjs/common';
import { RoleResolver } from './roles.resolver';
import { RoleSchema } from './roles.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './roles.service';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]), 
    ],
    providers: [RoleResolver, RoleService],
    exports: [RoleService]
})
export class RolesModule {}