import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    if ((await bcrypt.compare(pass, user.password)) === false) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.email,
      name: user.first_name + ' ' + user.last_name,
      is_admin: user.is_admin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(user: CreateUserDto): Promise<any> {
    this.usersService.create(user);
    // return await bcrypt.hash(pass, 10);
  }
}
