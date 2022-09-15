import 'dotenv/config';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from 'src/application/controllers/authentication.controller';
import { DB_GNV_URL } from 'src/constants';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: DB_GNV_URL,
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
