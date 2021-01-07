import axios from 'axios';
import fs from 'fs';
import path from 'path';

function download(url, dest) {
  const file = fs.createWriteStream(dest);
  return axios
    .get(url, { responseType: 'stream' })
    .then((response) => {
      return new Promise((resolve, reject) => {
        response.data.pipe(file);
        let error = null;
        file.on('error', (err) => {
          error = err;
          file.close();
          reject(err);
        });
        file.on('close', () => {
          if (!error) {
            resolve(true);
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function downloadArkEtfs() {
  const arkqUrl =
    'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.csv';
  const arkkUrl =
    'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv';
  const arkfUrl =
    'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.csv';
  const arkgUrl =
    'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS.csv';
  const arkwUrl =
    'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_NEXT_GENERATION_INTERNET_ETF_ARKW_HOLDINGS.csv';

  const arkEtfs = [
    { name: 'arkq', url: arkqUrl },
    { name: 'arkk', url: arkkUrl },
    { name: 'arkf', url: arkfUrl },
    { name: 'arkw', url: arkwUrl },
    { name: 'arkg', url: arkgUrl },
  ];

  const csvDir = path.resolve(__dirname, 'arkcsv');

  const downloadPromises = arkEtfs.map(({ name, url }) => {
    const destination = path.resolve(csvDir, `${name}.csv`);
    return download(url, destination);
  });

  return Promise.all(downloadPromises);
}
