import { Module, forwardRef } from '@nestjs/common';
import { ProductsResolver } from './product.resolver';
import { ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), 
        forwardRef(() => CategoryModule)
    ],
    providers: [ProductsResolver, ProductService],
    exports: [ProductService]
})
export class ProductsModule {}
