import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DEV_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

// Used to see if I could insert in psql
// pool.query(
//   "INSERT INTO student(firstname, lastname, age, address, email)VALUES('Mary Ann', 'Wilters', 20, '74 S Westgate St', 'mroyster@royster.com')",
//   (err, res) => {
//     console.log(err, res);
//     pool.end();
//   }
// );

module.exports = { pool };
