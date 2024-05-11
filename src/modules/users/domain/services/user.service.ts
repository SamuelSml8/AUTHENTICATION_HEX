import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository.interface';
import { CreateUserDto, updateUserDto } from '../../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { User } from '../entities/users.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<JSONResponse<User>> {
    return await this.userRepository.createUser(createUserDto);
  }

  async findUserById(id: string): Promise<JSONResponse<User>> {
    return await this.userRepository.findUserById(id);
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

  async deleteUser(id: string): Promise<JSONResponse<void>> {
    return await this.userRepository.deleteUser(id);
  }
}
