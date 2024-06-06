import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT || !DB_PORT) {
  throw new Error('Missing one or more required environment variables');
}

const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'];

if (!validDialects.includes(DB_DIALECT as Dialect)) {
  throw new Error(`Invalid DB_DIALECT: ${DB_DIALECT}`);
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as Dialect,
  port: parseInt(DB_PORT),
});

export default sequelize;
