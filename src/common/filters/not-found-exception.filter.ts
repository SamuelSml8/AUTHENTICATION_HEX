import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { jsonResponse } from '../response.utils';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    jsonResponse(false, `Resource ${request.url} not found`, null);

    response.status(HttpStatus.NOT_FOUND).json(jsonResponse(false, `Resource ${request.url} not found`, null));
  }
}
