import { Injectable } from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard'; // Adjust the path accordingly

@Injectable()
export class AuthGuard extends BaseAuthGuard {
  protected validateRole(decodedToken: any): boolean {
    return true;
  }
}
