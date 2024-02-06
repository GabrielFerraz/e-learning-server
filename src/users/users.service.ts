import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as process from "process";

@Injectable()
export class UsersService {
  //changeme
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: '$2b$10$YKBWzbGuba92UzbcaUl6Z.DOIF6pbxtLlfGYdw5u8LnFThRocZCNC',
      email: '',
      is_admin: 0,
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      email: '',
      is_admin: 0,
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(user: CreateUserDto) {
    try {
      user.password = await bcrypt.hash(user.password, +process.env.BCRYPTSALT);
      const dbUser = this.usersRepository.create(user);
      return await this.usersRepository.insert(dbUser);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return { error: 'Email already being used' };
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User | undefined> {
    // return this.users.find((user) => user.username === username);
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
