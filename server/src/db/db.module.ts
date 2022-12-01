import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MYSQL_CONNECTION } from 'src/constants';

const mysql = require('mysql2/promise');

const dbProvider = {
  provide: MYSQL_CONNECTION,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<any> => {
    const pool = mysql.createPool({
      host: configService.get<string>('MYSQL_HOST'),
      user: configService.get<string>('MYSQL_USER'),
      password: configService.get<string>('MYSQL_PW'),
      database: configService.get<string>('MYSQL_DB'),
    });
    return pool;
  },
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
