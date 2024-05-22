import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Auth NestJS Documentation | Van Rossum')
    .setDescription(
      'Welcome to the Riwi Coins Authentication API documentation. This API handles all authentication-related functionalities for the Riwi Coins platform, ensuring secure and efficient management of user authentication and authorization processes. The API provides endpoints for user login, registration, and token management, enabling seamless integration with the overall application.\n\n ▪️ Hernán Pereira \n\n ▪️ Samuel Vera',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication Module')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = process.env.port || 3001;

  await app.listen(port);
  console.log(
    `💜 Server on port: ${port} \n\n▪️ Server:\n💜 http://localhost:${port}/api/v1 \n\n▪️ Documentation:\n💜 http://localhost:${port}/api-doc`,
  );
}
bootstrap();
