import { JSONResponse } from 'src/common/json-response.interface';
import { CreateUserDto, updateUserDto } from '../../application/dtos';
import { User } from '../entities/users.entity';

export interface UserRepository {
  createUser(createUserDto: CreateUserDto): Promise<JSONResponse<User>>;
  findUserById(id: string): Promise<JSONResponse<User>>;
  findAllUsers(): Promise<JSONResponse<User[]>>;
  updateUser(
    id: string,
    updateUserDto: updateUserDto,
  ): Promise<JSONResponse<User>>;
  deleteUser(id: string): Promise<JSONResponse<User>>;
}
