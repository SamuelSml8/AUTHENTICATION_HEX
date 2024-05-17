import { Injectable } from '@nestjs/common';
import { LoginDto } from '../../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from '../../infrastructure/types';
import { MongooseAuthRepository } from '../../infrastructure/mongoose-auth-repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: MongooseAuthRepository) {}

  async login(loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    return await this.authRepository.login(loginDto);
  }
}
