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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiBearerAuth()
  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @Get('all')
  async findAllUsers(): Promise<JSONResponse<User[]>> {
    return this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<JSONResponse<User>> {
    return this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiBearerAuth()
  @Get('email/:email')
  async findUserByEmail(
    @Param('email') email: string,
  ): Promise<JSONResponse<User>> {
    return this.userService.findUserByEmail(email);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<JSONResponse<User>> {
    return this.userService.deleteUser(id);
  }
}
