import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto, updateUserDto } from '../dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { User } from '../../domain/entities/users.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  async findAllUsers(): Promise<JSONResponse<User[]>> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(id: string): Promise<JSONResponse<User>> {
    return this.userService.findUserById(id);
  }

  @Put('update/:id')
  async updateUser(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  async deleteUser(id: string): Promise<JSONResponse<void>> {
    return this.userService.deleteUser(id);
  }
}
