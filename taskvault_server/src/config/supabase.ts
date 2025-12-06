import { envConfig } from "./env";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../entities/user.entity";
import { Task } from "../entities/task.entity";
import { join } from "path";

const databaseConfig: DataSourceOptions = {
  type: "postgres",
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_DATABASE,
  entities: [User, Task],
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, "../migrations/**/*{.ts,.js}")],
  extra: {
    connectionTimeoutMillis: 10000,
    max: 5,
  },
  ssl: envConfig.DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
};

const AppDataSource = new DataSource(databaseConfig);
export default AppDataSource;
