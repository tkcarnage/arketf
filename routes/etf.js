import { Router } from 'express';
import db from '../db/config';

const router = Router();

router.get('/', async (req, res) => {
  const arkf = await db.any('SELECT * FROM arkf');
  const arkg = await db.any('SELECT * FROM arkg');
  const arkk = await db.any('SELECT * FROM arkk');
  const arkq = await db.any('SELECT * FROM arkq');
  const arkw = await db.any('SELECT * FROM arkw');
  return res.send({
    arkf,
    arkg,
    arkk,
    arkq,
    arkw,
  });
});

router.get('/arkf', async (req, res) => {
  const arkf = await db.any('SELECT * FROM arkf');
  return res.send(arkf);
});

router.get('/arkg', async (req, res) => {
  const arkg = await db.any('SELECT * FROM arkg');
  return res.send(arkg);
});

router.get('/arkk', async (req, res) => {
  const arkk = await db.any('SELECT * FROM arkk');
  return res.send(arkk);
});

router.get('/arkq', async (req, res) => {
  const arkq = await db.any('SELECT * FROM arkq');
  return res.send(arkq);
});

router.get('/arkw', async (req, res) => {
  const arkw = await db.any('SELECT * FROM arkw');
  return res.send(arkw);
});

export default router;
