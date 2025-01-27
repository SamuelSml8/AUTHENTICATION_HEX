import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/entities/users.entity';
import { UserService } from './domain/services/user.service';
import { MongooseUserRepository } from './infrastructure/mongoose-user-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserService, MongooseUserRepository],
  exports: [UserService, MongooseUserRepository],
})
export class UsersModule {}
