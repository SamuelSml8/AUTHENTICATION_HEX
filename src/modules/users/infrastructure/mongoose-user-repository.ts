import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/entities/users.entity';
import { Model } from 'mongoose';
import { CreateUserDto, updateUserDto } from '../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { isValidObjectId } from 'src/common/object-id-validation';
import { isRegisteredEmail } from 'src/common/check-email-exist';
import { jsonResponse } from 'src/common/response.utils';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<JSONResponse<User>> {
    try {
      if (await isRegisteredEmail(this.userModel, createUserDto.email)) {
        throw new HttpException(
          jsonResponse(
            false,
            `Email ${createUserDto.email} already exists`,
            null,
          ),
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdUser = await this.userModel.create(createUserDto);
      return jsonResponse(true, 'User created successfully', createdUser);
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: string): Promise<JSONResponse<User>> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(
          jsonResponse(false, `Invalid user ID: ${id}`, null),
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new HttpException(
          jsonResponse(false, `User with id ${id} not found`, null),
          HttpStatus.NOT_FOUND,
        );
      }

      return jsonResponse(true, 'User found successfully', user);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<JSONResponse<User>> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      return jsonResponse(true, 'User found successfully', user);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(): Promise<JSONResponse<User[]>> {
    try {
      const users = await this.userModel.find();

      return jsonResponse(true, 'Users list', users);
    } catch (error) {
      throw new HttpException(
        jsonResponse(false, 'Failed to find all users', null),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(
          jsonResponse(false, `Invalid user ID: ${id}`, null),
          HttpStatus.BAD_REQUEST,
        );
      }
      const userToUpdate = await this.userModel.findById(id).exec();

      const emailExists = await isRegisteredEmail(
        this.userModel,
        updateUserDto.email,
      );

      if (emailExists && updateUserDto.email != userToUpdate.email) {
        throw new HttpException(
          jsonResponse(
            false,
            `Email ${updateUserDto.email} already exists`,
            null,
          ),
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        throw new HttpException(
          jsonResponse(false, `User with id ${id} not found`, null),
          HttpStatus.NOT_FOUND,
        );
      }
      return jsonResponse(true, 'User updated successfully', updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<JSONResponse<User>> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(
          jsonResponse(false, `Invalid user ID: ${id}`, null),
          HttpStatus.BAD_REQUEST,
        );
      }

      const userFound = await this.userModel.findByIdAndDelete(id);

      if (!userFound) {
        throw new HttpException(
          jsonResponse(false, `User with id ${id} not found`, null),
          HttpStatus.NOT_FOUND,
        );
      }

      return jsonResponse(true, 'User deleted successfully', userFound);
    } catch (error) {
      throw error;
    }
  }
}
