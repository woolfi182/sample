import 'tuple-it/register';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new CustomExceptionFilter());

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
  const logger = new Logger('Main');
  logger.log(`Service is up and listening on port: [${port}]`);
}

bootstrap();
