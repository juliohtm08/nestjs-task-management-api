import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Aplica a ValidationPipe globalmente para habilitar validação automática de DTOs
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
