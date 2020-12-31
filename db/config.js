import dotenv from 'dotenv';
import pgPromise from 'pg-promise';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV_DATABASE}`;

const pgp = pgPromise({/* Initialization Options */});
const db = pgp({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = db;
