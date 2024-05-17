import { JSONResponse } from 'src/common/json-response.interface';
import { LoginDto, RegisterDto } from '../../application/dtos';
import { Tokens } from '../../infrastructure/types';
import { User } from 'src/modules/users/domain/entities/users.entity';

export interface AuthRepository {
  login(loginDto: LoginDto): Promise<JSONResponse<Tokens>>;
  register(registerDto: RegisterDto): Promise<JSONResponse<User>>;
}
