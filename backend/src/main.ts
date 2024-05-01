import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './utlis/ConfigService';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.setGlobalPrefix('api');

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
