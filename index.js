import express from 'express';
import bodyParser from 'body-parser';
import { pool } from './db/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   client
//   .query(`SELECT * FROM student`, values)
//   .then(res => {
//     console.log(res.rows[0])
//   })
//   .catch(e => console.error(e.stack))
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`);
});
