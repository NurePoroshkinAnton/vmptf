import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './utlis/ConfigService';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
