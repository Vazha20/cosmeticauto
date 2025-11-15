import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ static ფაილების სერვირება
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // ✅ CORS ყველა მეთოდზე
  app.enableCors({
    origin: process.env.FRONT_URL /*|| 'http://localhost:3000'*/,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const PORT = process.env.PORT /*|| 3001*/;
  /*await app.listen(PORT);*/
  /*console.log(`🚀 Server running on http://localhost:${PORT}`);*/
}
bootstrap();
