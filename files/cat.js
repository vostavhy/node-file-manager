import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const readFile = async (currentDir, pathToFile) => {
  const filePath = path.join(currentDir, pathToFile);

  try {
    await access(filePath);
    const input = createReadStream(filePath);
    input.pipe(process.stdout);
    process.stdout.write('\n');
  } catch {
    process.stdout.write(OPERATION_FAILED);
  }
};
