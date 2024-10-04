import { ArgumentsHost, Catch, Logger, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseException } from './exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(Error)
export class CustomExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(CustomExceptionFilter.name);

  constructor() {
    super();
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    this.logException(ctx, exception);
    this.applyDefault(exception);

    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }

  applyDefault(exception: any): void {
    if (!('getStatus' in exception)) {
      exception.getStatus = () => 500;
      exception.message = 'Internal server error';
    }
  }

  logException(ctx: HttpArgumentsHost, exception: any): void {
    if (exception instanceof BaseException) {
      this.logger.warn({
        function: 'GlobalExceptionFilter',
        message: exception.message,
        stack: exception.stack,
        payload: exception.payload,
      });
    } else if (exception instanceof NotFoundException) {
      const res = exception.getResponse();
      const message = typeof res === 'string' ? res : res['message'];
      this.logger.warn(`NotFoundException 404: ${message}`);
    }
    // validation exception from class-validator
    else if (exception.response) {
      const request = ctx.getRequest();
      this.logger.warn({
        function: 'GlobalExceptionFilter',
        message: 'Validation error',
        stack: exception.stack,
        details: exception.response,
        payload: {
          body: request.body,
          params: request.params,
          query: request.query,
        },
      });
    }
    // Other exceptions
    else {
      this.logger.error({
        function: 'GlobalExceptionFilter',
        message: 'An error occurred',
        errorMessage: exception.message,
        stack: exception.stack,
      });
    }
  }
}
