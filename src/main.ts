import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  const port = process.env.port || 3001;

  await app.listen(port);
  console.log(
    `💜 Server on port: ${port} \n💜 http://localhost:${port}/api/v1`,
  );
}
bootstrap();
