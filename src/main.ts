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

// 2) დაამატეთ ლოგირების მექანიზმი, ნახეთ რა დრო ჭირდება თითოეულ რექუესთს. იუზერების წაკითხვაზე დაამატეთ ქეშირება რომ უფრო დააოპტიმიზიროთ თქვენი რისფონს თაიმი.

// რეფერენსი: https://drive.google.com/file/d/1T7kIpOq5jiyAW6G8hxXf5ONb3yUWTCsk/view?usp=drive_link
// https://github.com/Datodia/Gita-backend-3/commit/c6636606f962556bfd063e54551cb8090e2bbc7b
