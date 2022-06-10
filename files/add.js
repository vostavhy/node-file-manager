import { createWriteStream } from 'fs';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const createFile = (currentDir, fileName) => {
  const filePath = path.join(currentDir, fileName);
  const ws = createWriteStream(filePath, { flags: 'ax' });
  ws.on('error', () =>
    process.stdout.write(
      `${OPERATION_FAILED}File already exists: ${filePath} \n`
    )
  );
  ws.end();
};
