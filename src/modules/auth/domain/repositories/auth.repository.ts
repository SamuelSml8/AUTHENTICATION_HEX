import { JSONResponse } from 'src/common/json-response.interface';
import { LoginDto } from '../../application/dtos';
import { Tokens } from '../../infrastructure/types';

export interface AuthRepository {
  login(loginDto: LoginDto): Promise<JSONResponse<Tokens>>;
}
