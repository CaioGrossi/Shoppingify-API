import { ConnectionOptions } from 'typeorm';

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
};

export = config;
