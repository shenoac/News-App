import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { configs } from './env.js';
import entities from '../entities/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configs.database.POSTGRES_HOST,
  port: configs.database.POSTGRES_PORT,
  username: configs.database.POSTGRES_USER,
  password: configs.database.POSTGRES_PASSWORD,
  database: configs.database.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities,
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error in connecting to Database', error);
  }
};
