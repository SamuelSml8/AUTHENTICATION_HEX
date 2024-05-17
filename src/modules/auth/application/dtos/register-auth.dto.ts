import { Transform } from 'class-transformer';
import { LoginDto } from './login-auth.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/enums/user-enum.roles';

export class RegisterDto extends LoginDto {

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @IsNotEmpty()
  @IsBoolean()
  isActivate: boolean;
}
