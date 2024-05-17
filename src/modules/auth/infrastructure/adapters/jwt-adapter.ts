import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';
import { jsonResponse } from 'src/common/response.utils';

@Injectable()
export class JwtAdapter {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: JwtPayload, options: any): Promise<string> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new HttpException(
        jsonResponse(false, 'JWT_SECRET is not set', null),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      return this.jwtService.signAsync(payload, {
        secret: secretKey,
        ...options,
      });
    } catch (error) {
      throw new HttpException(
        jsonResponse(false, 'Error generating JWT token', null),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
