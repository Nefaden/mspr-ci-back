import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true
    })
  );

  const options = new DocumentBuilder()
    .setTitle('AYA Market API')
    .setDescription('API for AYA Market Website')
    .setVersion(process.env.npm_package_version)
    .addTag('AYA Market')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(+process.env.API_PORT);
}
bootstrap();
