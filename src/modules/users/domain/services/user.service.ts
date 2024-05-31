import { Injectable } from '@nestjs/common';
import { CreateUserDto, updateUserDto } from '../../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { User } from '../entities/users.entity';
import { MongooseUserRepository } from '../../infrastructure/mongoose-user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: MongooseUserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<JSONResponse<User>> {
    return await this.userRepository.createUser(createUserDto);
  }

  async findUserById(id: string): Promise<JSONResponse<User>> {
    return await this.userRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<JSONResponse<User>> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findAllUsers(): Promise<JSONResponse<User[]>> {
    return await this.userRepository.findAllUsers();
  }

  async updateUser(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<JSONResponse<User>> {
    return await this.userRepository.deleteUser(id);
  }
}
