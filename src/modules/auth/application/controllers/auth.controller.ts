import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from '../../infrastructure/types';
import { AuthService } from '../../domain/services/auth.service';
import { User } from 'src/modules/users/domain/entities/users.entity';
import { AdminGuard } from '../../infrastructure/guards/admin.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../infrastructure/guards/auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Register an user' })
  @ApiBearerAuth()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<JSONResponse<User>> {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req): Promise<JSONResponse<null>> {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token);
  }
}
