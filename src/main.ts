import * as dns from 'dns';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

// error fix
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// 2) იუზერების წაკითხვაზე დაამატეთ ქეშირება რომ უფრო დააოპტიმიზიროთ თქვენი რისფონს თაიმი.
