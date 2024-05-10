import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/entities/users.entity';
import { Model } from 'mongoose';
import { CreateUserDto, updateUserDto } from '../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<JSONResponse<User>> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const savedUser = await createdUser.save();
      return {
        ok: true,
        message: 'User created successfully',
        data: savedUser,
      };
    } catch (error) {
      return {
        ok: true,
        message: 'Failed to create user',
        data: null,
      };
    }
  }

  async findUserById(id: string): Promise<JSONResponse<User>> {
    try {
      const userFound = await this.userModel.findById(id);

      if (!userFound) {
        return { ok: false, message: 'User not found', data: null };
      }

      return { ok: true, message: 'User found by id', data: userFound };
    } catch (error) {
      return { ok: false, message: 'Failed to find user', data: null };
    }
  }

  async findAllUsers(): Promise<JSONResponse<User[]>> {
    try {
      const users = await this.userModel.find();

      return { ok: true, message: 'Users list', data: users };
    } catch (error) {
      return { ok: false, message: 'Failed to find users list', data: null };
    }
  }

  async updateUser(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    try {
      const userFound = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );

      if (!userFound) {
        return { ok: false, message: 'User not found', data: null };
      }

      return {
        ok: true,
        message: 'User updated successfully',
        data: userFound,
      };
    } catch (error) {
      return { ok: false, message: 'Failed to update user', data: null };
    }
  }

  async deleteUser(id: string): Promise<JSONResponse<void>> {
    const userFound = await this.userModel.findByIdAndDelete(id);

    if (!userFound) {
      return { ok: false, message: 'User not found', data: null };
    }

    return {
      ok: true,
      message: 'User deleted successfully',
      data: null,
    };
  }
}
