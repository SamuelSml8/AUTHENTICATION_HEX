import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from '../../infrastructure/types';
import { AuthService } from '../../domain/services/auth.service';
import { User } from 'src/modules/users/domain/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<JSONResponse<User>> {
    return this.authService.register(registerDto);
  }
}
