import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../types'; // Asegúrate de que JwtPayload esté definido correctamente
import { jsonResponse } from 'src/common/response.utils';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException(
        jsonResponse(false, 'No JWT token provided', null),
      );
    }

    try {
      const decodedToken = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decodedToken;

      if (decodedToken.role !== 'admin') {
        throw new ForbiddenException(
          jsonResponse(false, 'Only admins can perform this action', null),
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new UnauthorizedException(
          jsonResponse(false, 'Invalid token', null),
        );
      }
    }
  }

  private extractTokenFromHeader(authorizationHeader: string): string | null {
    if (!authorizationHeader) return null;
    const [, token] = authorizationHeader.split(' ');
    return token || null;
  }
}
