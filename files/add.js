import { createWriteStream } from 'fs';
import path from 'path';

export const createFile = (currentDir, fileName) => {
  const filePath = path.join(currentDir, fileName);
  createWriteStream(filePath);
};
