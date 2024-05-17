import { Injectable } from '@nestjs/common';
import { JwtAdapter } from '../../infrastructure/adapters/jwt-adapter';
import { JwtPayload, Tokens } from '../../infrastructure/types';

@Injectable()
export class TokenService {
  constructor(private readonly jwtAdapter: JwtAdapter) {}

  async generateTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const accessToken = await this.jwtAdapter.generateToken(
      jwtPayload,
      accessTokenOptions,
    );
    return { access_token: accessToken };
  }
}
