import { Module, forwardRef } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategorySchema } from './category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { ProductsModule } from '../product/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]), 
        forwardRef(() => ProductsModule)
        ],
    providers: [CategoryResolver, CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}
