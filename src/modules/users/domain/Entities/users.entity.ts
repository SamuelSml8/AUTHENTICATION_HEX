import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserRole } from '../enums/user-enum.roles';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ require: true })
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ require: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak',
  })
  @Prop({ require: true })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @Prop({ require: true })
  isActivate: boolean;

  @IsEnum(UserRole)
  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.CODER,
    require: true,
  })
  role: UserRole;

  createdAt?: Date;

  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
