import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Auth NestJS Documentation | Van Rossum')
    .setDescription(
      'Handling Riwi Coin user authentication\n\n ▪️ Hernán Pereira \n\n ▪️ Samuel Vera',
    )
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = process.env.port || 3001;

  await app.listen(port);
  console.log(
    `💜 Server on port: ${port} \n▪️ Server:\n💜 http://localhost:${port}/api/v1 \n\n▪️ Documentation:\n💜 http://localhost:${port}/api-doc`,
  );
}
bootstrap();
