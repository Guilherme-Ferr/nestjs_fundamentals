import 'dotenv/config';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from 'src/application/controllers/authentication.controller';
import {
  DB_GNV_HOST,
  DB_GNV_NAME,
  DB_GNV_USERNAME,
  DB_GNV_PASSWORD,
} from 'src/constants';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: {
          host: DB_GNV_HOST,
          user: DB_GNV_USERNAME,
          password: DB_GNV_PASSWORD,
          database: DB_GNV_NAME,
        },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
