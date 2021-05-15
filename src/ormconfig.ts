import { ConnectionOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,

  migrationsRun: true,

  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },

  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export = config;
