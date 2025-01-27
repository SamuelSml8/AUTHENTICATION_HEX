import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'The password must be at least 8 characters long' })
  @MaxLength(50, {
    message: 'The password must have maximum of 50 characters ',
  })
  readonly password: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly isActivate: boolean;

  @ApiProperty()
  @IsString()
  readonly role: string;
}
