import { LoginAuthDto } from './login-auth.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/enums/user-enum.roles';

export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
