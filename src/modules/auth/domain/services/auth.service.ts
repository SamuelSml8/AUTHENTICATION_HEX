import { Injectable } from '@nestjs/common';
import { LoginDto } from '../../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from '../../infrastructure/types';
import { MongooseAuthRepository } from '../../infrastructure/mongoose-auth-repository';
import { jsonResponse } from 'src/common/response.utils';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: MongooseAuthRepository) {}

  async login(loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    const tokens = await this.authRepository.login(loginDto);
    return jsonResponse(true, 'User successfully logged in', tokens);
  }
}
