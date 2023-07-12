import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const port = process.env.PORT || 8080;
  console.log(`Starting API on ${port}`);
  await app.listen(port);
}
bootstrap();
