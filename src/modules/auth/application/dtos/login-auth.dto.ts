import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @MinLength(8, { message: 'The password must be at least 8 characters' })
  @MaxLength(50, {
    message: 'The password must have a maximum of 100 characters',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
