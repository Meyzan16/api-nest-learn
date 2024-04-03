import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Global,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Global()
@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        code:400,
        errors : exception.errors
      })
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
