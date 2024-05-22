import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto, updateUserDto } from '../dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { User } from '../../domain/entities/users.entity';
import { AdminGuard } from 'src/modules/auth/infrastructure/guards/admin.guard';
import { AuthGuard } from 'src/modules/auth/infrastructure/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(AdminGuard) // Using the administrator guard
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async findAllUsers(): Promise<JSONResponse<User[]>> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string): Promise<JSONResponse<User>> {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard)
  async findUserByEmail(
    @Param('email') email: string,
  ): Promise<JSONResponse<User>> {
    return this.userService.findUserByEmail(email);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param('id') id: string): Promise<JSONResponse<User>> {
    return this.userService.deleteUser(id);
  }
}
