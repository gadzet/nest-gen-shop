import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt  from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('user found', user);
    if (user && user.password === bcrypt.hash(pass, 10)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateToken(auth: string) {        
    if(auth.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
        return await jwt.verify(token, this.configService.getSecret);
    } catch (err) {
        throw new HttpException(`Token error: ${err.message || err.name}`, HttpStatus.FORBIDDEN);
    }
  }
}