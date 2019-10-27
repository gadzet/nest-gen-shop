import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './types/product.interface';
import { ProductType } from './types/create-product.dto';
import { ProductInput } from './types/product.input';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async create(createProductDto: ProductInput): Promise<Product> {
    const createdCat = new this.productModel(createProductDto);
    return await createdCat.save();
  }

  // TODO UPDTATE
  // TODO DELETE
  // TODO SORT
  // TODO FILTER

  async findOne(id: string): Promise<Product[]> {
    return await this.productModel.findById(id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async find(searchParams: any): Promise<Product[]> {
    return await this.productModel.find(searchParams).exec();
  }

  async findChunk(skip: number, limit: number, sort: any): Promise<Product[]> {
      console.log('skip', skip);
      console.log('limit', limit);
      //if(!isNaN(skip) && !isNaN(limit)) {
        return await this.productModel
                                    .find()
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sort)
                                    .exec();
      //}
      return this.productModel.find().sort({
        breed: 'asc'
    });
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
   }

  async update(id: string, item: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, item, { new:  true   });
   }
   
}
