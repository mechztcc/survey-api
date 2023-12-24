import 'dotenv/config'
import { DataSource } from 'typeorm';

const data = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/src/modules/**/entities/**.ts'],
  migrations: [__dirname + '/src/shared/migrations/**.ts'],
  migrationsRun: false,
});

export default data;
