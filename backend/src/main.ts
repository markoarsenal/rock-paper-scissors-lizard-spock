import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Rock Paper Scissors Lizard Spock')
    .setDescription('The Rock Paper Scissors Lizard Spock API description')
    .setVersion('1.0')
    .addTag('rock-paper-scissors-lizard-spock')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001, process.env.HOST ?? 'localhost');
  console.log(
    `Server is running on http://${process.env.HOST ?? 'localhost'}:${process.env.PORT ?? 3001}`,
  );
}

bootstrap();
