import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { MongooseUserRepository } from 'src/modules/users/infrastructure/mongoose-user-repository';
import { LoginDto } from '../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from './types';
import { jsonResponse } from 'src/common/response.utils';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../domain/services/token.service';
import { HashService } from 'src/modules/utils/services/hash.service';

@Injectable()
export class MongooseAuthRepository implements AuthRepository {
  constructor(
    private readonly userService: MongooseUserRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}

  async login(loginDto: LoginDto): Promise<JSONResponse<Tokens>> {
    const userFound = await this.userService.findUserByEmail(loginDto.email);

    if (!userFound.data) {
      throw new HttpException(
        jsonResponse(false, `Email or password incorrect`, null),
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await this.hashService.compare(
      loginDto.password,
      userFound.data.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        jsonResponse(false, `email or Password incorrect`, null),
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = userFound.data;
    const { password, ...userWithoutPassword } = user;
    const payload = {
      sub: userWithoutPassword.id,
      ...userWithoutPassword,
    };

    return jsonResponse(
      true,
      'User successfully logged in',
      this.tokenService.generateTokens(payload),
    );
  }
}
