import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);
    return this.userRepository.findOneBy({id})
  }

  async remove(id: number) {
    await this.userRepository.delete({ id })
    return id
  }
}
