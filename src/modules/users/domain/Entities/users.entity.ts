import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  //IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

// export enum UserRole {
//   CODER = 'coder',
//   ADMIN = 'admin',
//   TRAINER = 'trainer',
// }

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ require: true })
  userId: string;

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
    message: 'password too weak',
  })
  @Prop({ require: true })
  password: number;

  @Prop({ require: true })
  isActivate: boolean;

  //   @IsEnum(UserRole)
  //   @Prop({ require: true })
  //   role: UserRole;

  createdAt?: Date;

  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
