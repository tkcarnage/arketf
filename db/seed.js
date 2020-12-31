import fs from 'fs';
import path from 'path';
import { parse } from 'fast-csv';
import db from './config';

const csvDir = path.join(__dirname + '/arkcsv/');
const arketfs = ['ARKK', 'ARKQ', 'ARKW', 'ARKG', 'ARKF'];

// Drop and create tables then insert rows
const dropTableQuery = `DROP TABLE IF EXISTS ${arketfs[0]}, ${arketfs[1]}, ${arketfs[2]}, ${arketfs[3]}, ${arketfs[4]}`;
// drop tables
db.none(dropTableQuery)
  .then(res => {
    // Create tables
    console.log('DROPPED TABLES...');
    const arketfTablesPromises = arketfs.map(etf => {
      const createTableQuery = `CREATE TABLE ${etf} (id INT GENERATED ALWAYS AS IDENTITY, date DATE, fund VARCHAR, company VARCHAR, ticker VARCHAR, cusip VARCHAR, shares BIGINT, market_value NUMERIC(2), weight NUMERIC(2))`;
      return db.none(createTableQuery);
    });
    return Promise.all(arketfTablesPromises);
  })
  .then(res => {
    // insert rows
    // headers for csv --> date,fund,company,ticker,cusip,shares,"market value($)",weight(%)
    console.log('CREATED TABLES...');
    arketfs.forEach(etf => {
      const copyQuery = `COPY ${etf} FROM ‘${csvDir}${etf}’`
      db.one(copyQuery)
        .on('error', error => console.error(error))
        .on('data', data => console.log(data))
        .on('end', rowCount => console.log(rowCount));
    });
  })
  .catch(err => {
    return err;
  });