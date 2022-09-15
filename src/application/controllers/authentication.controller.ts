import { Controller, Post } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('user')
  async getHello() {
    const gnvSealSupplies = await this.knex('filling_stations as fs')
      .select({
        company_name: 'fs.company_name',
        street: 'a.street',
        number: 'a.number',
        neighborhood: 'a.neighborhood',
        city_name: 'a.city_name',
        state_name: 'a.state_name',
        supply_at: 'vs.supply_at',
      })
      .innerJoin('valid_supplies as vs', 'fs.id', 'vs.filling_station_id')
      .innerJoin('addresses as a', 'fs.address_id', 'a.id')
      .whereNull('vs.finished_at')
      .andWhere('vs.gnv_seal_chip_id', 1)
      .andWhereRaw(`vs.supply_at >= '2022-01-01'`)
      .andWhereRaw(`vs.supply_at <= '2022-09-15'`)
      .limit(15)
      // .offset((pag - 1) * 10)
      .orderByRaw('vs.supply_at desc');

    return { gnvSealSupplies };
  }
}
