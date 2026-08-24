"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'auth',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});
