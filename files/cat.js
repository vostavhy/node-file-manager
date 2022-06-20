import { createReadStream } from 'fs';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const readFile = async (currentDir, pathToFile) => {
  const filePath = path.resolve(currentDir, pathToFile);
  const input = createReadStream(filePath);
  input.on('error', () => process.stdout.write(OPERATION_FAILED));
  input.on('end', () => process.stdout.write('\n'));
  input.pipe(process.stdout);
};
