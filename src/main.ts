import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false, // if set to true, optional values won't be passed to DTO
    transform: true
  }));  

  const options = new DocumentBuilder()
    .setTitle('Nested prototype')
    .setDescription('Users and locations API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
