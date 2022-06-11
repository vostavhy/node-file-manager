import { rm } from 'fs/promises';
import path from 'path';
import { OPERATION_FAILED } from '../utils/constants.js';

export const remove = async (currentDir, fileName) => {
  const currentFile = path.resolve(currentDir, fileName);
  console.log(currentFile);

  try {
    await rm(currentFile, { recursive: true });
  } catch (error) {
    process.stdout.write(OPERATION_FAILED);
  }
};
