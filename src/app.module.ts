import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/product.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ProductsModule,
    CategoryModule,
    UserModule,
    ConfigModule,
    RolesModule,
    GraphQLModule.forRoot({
      debug: false, // todo use process env
      playground: true,
      autoSchemaFile: 'schema.gqli',
      context: ({ req }) => ({ headers: req.headers }),
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
