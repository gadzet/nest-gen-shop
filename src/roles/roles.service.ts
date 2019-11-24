import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './types/role.interface';
import { RoleType } from './types/create-role.dto';
import { RoleInput } from './types/role.input';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async create(createRoletDto: RoleInput): Promise<Role> {
    const createdCat = new this.roleModel(createRoletDto);
    // TODO check if user exists
    // TODO add timestamp

    return await createdCat.save();
  }

  async findOne(id: string): Promise<Role[]> {
    return await this.roleModel.findById(id);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  async find(searchParams: any): Promise<Role[]> {
    return await this.roleModel.find(searchParams).exec();
  }

  async findChunk(skip: number, limit: number, sort: any): Promise<Role[]> {
        return await this.roleModel
                                    .find()
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sort)
                                    .exec();
  }

  async delete(id: string): Promise<Role> {
    return await this.roleModel.findByIdAndRemove(id);
   }

  async update(id: string, item: Role): Promise<Role> {
    return await this.roleModel.findByIdAndUpdate(id, item, { new:  true   });
   }
   
}
