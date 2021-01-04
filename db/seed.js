import path from 'path';
import db from './config';

const csvDir = path.resolve(`${__dirname}/arkcsv/`);

// Drop and create tables then copy CSVs
async function dropTables() {
  const dropTableQuery = `DROP TABLE IF EXISTS arkk, arkq, arkw, arkg, arkf`;
  try {
    await db.none(dropTableQuery).catch((err) => {
      throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

async function createTables() {
  const createTableArkfQuery = `CREATE TABLE arkf (date TEXT, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares NUMERIC(40,2), market_value NUMERIC(40,2), weight NUMERIC(5,2))`;
  const createTableArkgQuery = `CREATE TABLE arkg (date TEXT, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares NUMERIC(40,2), market_value NUMERIC(40,2), weight NUMERIC(5,2))`;
  const createTableArkkQuery = `CREATE TABLE arkk (date TEXT, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares NUMERIC(40,2), market_value NUMERIC(40,2), weight NUMERIC(5,2))`;
  const createTableArkqQuery = `CREATE TABLE arkq (date TEXT, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares NUMERIC(40,2), market_value NUMERIC(40,2), weight NUMERIC(5,2))`;
  const createTableArkwQuery = `CREATE TABLE arkw (date TEXT, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares NUMERIC(40,2), market_value NUMERIC(40,2), weight NUMERIC(5,2))`;
  try {
    await db.none(createTableArkfQuery).catch((err) => {
      throw err;
    });
    await db.none(createTableArkgQuery).catch((err) => {
      throw err;
    });
    await db.none(createTableArkkQuery).catch((err) => {
      throw err;
    });
    await db.none(createTableArkqQuery).catch((err) => {
      throw err;
    });
    await db.none(createTableArkwQuery).catch((err) => {
      throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

async function copyCSVs() {
  const copyArkfQuery = `COPY Arkf from '${csvDir}Arkf.csv' DELIMITER ',' CSV HEADER`;
  const copyArkgQuery = `COPY Arkg from '${csvDir}Arkg.csv' DELIMITER ',' CSV HEADER`;
  const copyArkkQuery = `COPY Arkk from '${csvDir}Arkk.csv' DELIMITER ',' CSV HEADER`;
  const copyArkqQuery = `COPY Arkq from '${csvDir}Arkq.csv' DELIMITER ',' CSV HEADER`;
  const copyArkwQuery = `COPY Arkw from '${csvDir}Arkw.csv' DELIMITER ',' CSV HEADER`;
  try {
    await db.none(copyArkfQuery).catch((err) => {
      throw err;
    });
    await db.none(copyArkgQuery).catch((err) => {
      throw err;
    });
    await db.none(copyArkkQuery).catch((err) => {
      throw err;
    });
    await db.none(copyArkqQuery).catch((err) => {
      throw err;
    });
    await db.none(copyArkwQuery).catch((err) => {
      throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

async function runSeed() {
  await dropTables();
  console.log('*****DROPPED TABLES*****');
  await createTables();
  console.log('*****CREATED TABLES*****');
  await copyCSVs();
  console.log('*****FINISHED*****');
}

runSeed();
