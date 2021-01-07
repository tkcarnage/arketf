import path from 'path';
import fs from 'fs';
import * as csv from 'fast-csv';
import db from './config';

export default function update() {
  const arkEtfs = ['arkf', 'arkg', 'arkk', 'arkq', 'arkw'];
  // create read stream from each etf csv
  arkEtfs.forEach((etf) => {
    const csvData = [];
    fs.createReadStream(path.resolve(__dirname, 'arkcsv', `${etf}.csv`))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (data) => {
        csvData.push(data);
      })
      .on('end', () => {
        // remove useless data at the end of csv
        csvData.splice(-3);

        // insert each row into postgres
        csvData.forEach((row) => {
          const {
            'market value($)': marketValue,
            'weight(%)': weight,
            ...rest
          } = row;
          const formatedRow = { ...rest, marketValue, weight };
          const insertQuery = `INSERT INTO arketf(date, fund, company, ticker, cusip, shares, market_value, weight) VALUES ($<date>, $<fund>, $<company>, $<ticker>, $<cusip>, $<shares>, $<marketValue>, $<weight>)`;
          db.none(insertQuery, formatedRow);
        });
      });
    console.log(`Finished parsing and inserting ${etf}.csv`);
  });
}
