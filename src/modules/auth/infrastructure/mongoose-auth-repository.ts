import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { MongooseUserRepository } from 'src/modules/users/infrastructure/mongoose-user-repository';
import { LoginDto, RegisterDto } from '../application/dtos';
import { JSONResponse } from 'src/common/json-response.interface';
import { Tokens } from './types';
import { jsonResponse } from 'src/common/response.utils';
import { TokenService } from '../domain/services/token.service';
import { HashService } from 'src/modules/utils/services/hash.service';
import { User } from 'src/modules/users/domain/entities/users.entity';

@Injectable()
export class MongooseAuthRepository implements AuthRepository {
  constructor(
    private readonly userService: MongooseUserRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}

  async register(registerDto: RegisterDto): Promise<JSONResponse<User>> {
    const userFound = await this.userService.findUserByEmail(registerDto.email);

    if (userFound.data) {
      throw new HttpException(
        jsonResponse(false, `Email already in use`, null),
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashService.hash(registerDto.password);


    const newUser = {
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: registerDto.role,
      isActivate: registerDto.isActivate,
    };

    const createUser = await this.userService.createUser(newUser);

    if (!createUser.data) {
      throw new BadRequestException(
        jsonResponse(false, 'failed to create user', null),
      );
    }

    return jsonResponse(true, 'User successfully registered', newUser);
  }

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
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActivate: user.isActivate,
    };

    return jsonResponse(
      true,
      'User successfully logged in',
      await this.tokenService.generateTokens(payload),
    );
  }
}
