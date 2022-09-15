import { Controller, Get } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get('vapo')
  async getHello() {
    if (!(await this.knex.schema.hasTable('users'))) {
      await this.knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
      });
    }
    await this.knex.table('users').insert({ name: 'Name' });
    const users = await this.knex.table('users');
    return { users };
  }
}
