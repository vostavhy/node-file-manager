import path from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { OPERATION_FAILED } from '../utils/constants.js';

export const printHash = (currentDir, fileName) => {
  const filePath = path.resolve(currentDir, fileName);
  const hash = createHash('sha256');
  const rs = createReadStream(filePath);
  let data = '';

  rs.on('data', (chunk) => (data += chunk));
  console.log('data:', data);
  console.log('path:', filePath);

  rs.on('error', (error) => {
    process.stdout.write(OPERATION_FAILED);
    console.log(error.message);
    return;
  });

  hash.update(data);
  console.log(hash.digest('hex'));
};
