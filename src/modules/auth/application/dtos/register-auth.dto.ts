import { Transform } from 'class-transformer';
import { LoginDto } from './login-auth.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/enums/user-enum.roles';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActivate: boolean;
}
