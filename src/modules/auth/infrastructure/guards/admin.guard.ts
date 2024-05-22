import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard'; // Adjust the path accordingly
import { jsonResponse } from 'src/common/response.utils';

@Injectable()
export class AdminGuard extends BaseAuthGuard {
  protected validateRole(
    decodedToken: any,
    context: ExecutionContext,
  ): boolean {
    if (decodedToken.role !== 'admin') {
      throw new ForbiddenException(
        jsonResponse(false, 'Only admins can perform this action', null),
      );
    }
    return true;
  }
}
