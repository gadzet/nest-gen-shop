import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './types/user.interface';
import { UserType } from './types/create-user.dto';
import { UserInput } from './types/user.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private configService: ConfigService
    ) {}

  async create(createProductDto: UserInput): Promise<User> {
    const createdCat = new this.userModel(createProductDto);
    return await createdCat.save();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.find(user => user.email === email);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async find(searchParams: any): Promise<User[]> {
    return await this.userModel.find(searchParams).exec();
  }

  async search(skip: number, limit: number, sort: any): Promise<User[]> {
        return await this.userModel
                                    .find()
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sort)
                                    .exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
   }

  async update(id: string, item: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, item, { new:  true   });
   }
   
   async login(data: User): Promise<User>  {
    const { email, password } = data;
    const user = await this.userModel.findOne({email}).exec();    
    const { _id } = user;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    // check max tut
    user.token = jwt.sign(
      {
        _id,
        email,
      },
      this.configService.get('SECRET'),
      { expiresIn: '7d' },
    );
    return user;
  }
}
