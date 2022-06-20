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

  rs.on('end', () => {
    hash.update(data);
    console.log(hash.digest('hex'));
  });

  rs.on('error', () => {
    process.stdout.write(OPERATION_FAILED);
  });
};
