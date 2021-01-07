import update from './update';
import download from './download';

async function syncdb() {
  await download();
  console.log('*****DOWNLOADED CSVS****');
  await update();
}

syncdb();
