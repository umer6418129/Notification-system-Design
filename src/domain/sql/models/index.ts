import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of Sequelize
const postgressDb = new Sequelize(
  process.env.DATABASE_DBNAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT as 'postgres',
    port: parseInt(process.env.DATABASE_PORT as string, 10),
  }
);

export default postgressDb;
