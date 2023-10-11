import { DataSource, DataSourceOptions } from 'typeorm';
// config({ path: `.env.${process.env.APP_ENV}` });
// console.log(process.env.DATABASE_NAME);
export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database:'annonce.db',
  
//   port: parseInt(process.env.DATABASE_PORT),
//   database: process.env.DATABASE_NAME,
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  // migrations: [`src/migrations/${process.env.APP_ENV}/*.ts`] 
};

const datasource = new DataSource(dataSourceOptions);

export default datasource;
