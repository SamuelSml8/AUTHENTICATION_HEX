import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './domain/services/auth.service';
import { MongooseAuthRepository } from './infrastructure/mongoose-auth-repository';
import { TokenService } from './domain/services/token.service';
import { JwtAdapter } from './infrastructure/adapters/jwt-adapter';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    UsersModule,
    UtilsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' },
    }),
  ],
  controllers: [],
  providers: [AuthService, TokenService, JwtAdapter, MongooseAuthRepository],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
