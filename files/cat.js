import { createReadStream } from 'fs';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const readFile = async (currentDir, pathToFile) => {
  const filePath = path.join(currentDir, pathToFile);
  const input = createReadStream(filePath);
  input.on('error', () => process.stdout.write(OPERATION_FAILED));
  input.pipe(process.stdout);
  process.stdout.write('\n');
};
