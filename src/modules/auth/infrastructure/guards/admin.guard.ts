import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwtPayload.type';
import { UserRole } from 'src/modules/users/domain/enums/user-enum.roles';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // No hay token JWT, denegar el acceso
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as JwtPayload;

    if (!decodedToken || !decodedToken.role) {
      return false; // No se pudo decodificar el token o falta el rol, denegar el acceso
    }

    const userRole = decodedToken.role;

    return userRole === UserRole.ADMIN; // Verificar si el usuario es administrador
  }
}
