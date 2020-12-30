import fs from 'fs';
import fastcsv from 'fast-csv';
import dotenv from 'dotenv';

dotenv.config();

const Pool = require("pg").Pool;

// remove the first line: header
csvData.shift();

// create a new connection pool to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "123",
  port: 5432
});

const query =
  "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)";

pool.connect((err, client, done) => {
  if (err) throw err;
  try {
    csvData.forEach(row => {
      client.query(query, row, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("inserted " + res.rowCount + " row:", row);
        }
      });
    });
  } finally {
    done();
  }
});
In the code above, we iterate over csvData array, each row will be saved to PostgreSQL using pg client pool.

done() function is used to release the client when process finishes.

More details about Pooling with pg could be find at:
https://node-postgres.com/features/pooling.

Write full code
The whole code looks like:

const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("bezkoder.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "testdb",
      password: "123",
      port: 5432
    });

    const query =
      "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);