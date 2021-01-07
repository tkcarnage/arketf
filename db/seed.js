import update from './update';
import download from './download';
import db from './config';

// Drop and create tables then copy CSVs
async function dropTable() {
  const dropTableQuery = `DROP TABLE IF EXISTS arketf`;
  try {
    await db.none(dropTableQuery).catch((err) => {
      throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

async function createTable() {
  const createTableArkQuery =
    'CREATE TABLE arketf' +
    '(id INT GENERATED ALWAYS AS IDENTITY, date DATE, fund VARCHAR, company VARCHAR, ticker VARCHAR,' +
    'cusip VARCHAR, shares NUMERIC, market_value NUMERIC,' +
    'weight NUMERIC, price_bought_at NUMERIC GENERATED ALWAYS AS (market_value / shares) STORED)';
  try {
    await db.none(createTableArkQuery).catch((err) => {
      throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

async function runSeed() {
  await download();
  console.log('*****DOWNLOADED CSVS****');
  await dropTable();
  console.log('*****DROPPED TABLES*****');
  await createTable();
  console.log('*****CREATED TABLES*****');
  await update();
}

runSeed();
