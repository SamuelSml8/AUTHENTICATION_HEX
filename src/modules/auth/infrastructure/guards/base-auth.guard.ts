import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types'; // Ensure JwtPayload is correctly defined
import { jsonResponse } from 'src/common/response.utils';
import { TokenService } from '../../domain/services/token.service';

@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException(
        jsonResponse(false, 'No JWT token provided', null),
      );
    }

    if (this.tokenService.isTokenInvalidated(token)) {
      throw new UnauthorizedException(
        jsonResponse(false, 'Token has been invalidated', null),
      );
    }

    try {
      const decodedToken = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decodedToken;

      return this.validateRole(decodedToken, context);
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

  protected validateRole(
    decodedToken: JwtPayload,
    context: ExecutionContext,
  ): boolean {
    return true;
  }

  private extractTokenFromHeader(authorizationHeader: string): string | null {
    if (!authorizationHeader) return null;
    const [, token] = authorizationHeader.split(' ');
    return token || null;
  }
}
