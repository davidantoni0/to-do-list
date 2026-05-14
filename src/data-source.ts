import "reflect-metadata";
import {DataSource, type DataSourceOptions} from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Tarefa } from "./entities/Tarefa";

const options: DataSourceOptions = {
    type: (process.env.DB_TYPE as "postgres"),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Usuario, Tarefa],
    migrations: [],
    subscribers: [],

}

export const AppDataSource = new DataSource(options);