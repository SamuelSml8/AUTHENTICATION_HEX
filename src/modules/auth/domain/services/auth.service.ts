import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from '../../infrastructure/types';
import { MongooseAuthRepository } from '../../infrastructure/mongoose-auth-repository';
import { User } from 'src/modules/users/domain/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: MongooseAuthRepository) {}

  async login(loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    return await this.authRepository.login(loginDto);
  }

  async register(registerDto: RegisterDto): Promise<JSONResponse<User>> {
    return await this.authRepository.register(registerDto);
  }

  async logout(token: string): Promise<JSONResponse<null>> {
    return await this.authRepository.logout(token);
  }
}
