import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './types/category.interface';
import { CategoryType } from './types/create-category.dto';
import { CategoryInput } from './types/category.input';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async create(createCategoryDto: CategoryInput): Promise<Category> {
    const createdCat = new this.categoryModel(createCategoryDto);
    return await createdCat.save();
  }

  async findOne(id: any): Promise<Category[]> {
    return await this.categoryModel.findById(id);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findChunk(skip: number, limit: number, sort: any): Promise<Category[]> {
        return await this.categoryModel
                                    .find()
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sort)
                                    .exec();
  }

  async delete(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id);
   }

  async update(id: string, item: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, item, { new:  true   });
   }
   
}
