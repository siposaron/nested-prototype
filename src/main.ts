import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false, // if set to true, optional values won't be passed to DTO
    transform: true
  }));  
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
