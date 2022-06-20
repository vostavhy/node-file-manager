import { access, rename as promiseRename } from 'fs/promises';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const rename = async (currentDir, curFile, nFile) => {
  const currentFile = path.resolve(currentDir, curFile);
  const newFile = path.resolve(currentDir, nFile);

  let isNewFile;

  try {
    await access(newFile);
    isNewFile = true;
  } catch {
    isNewFile = false;
  }

  if (isNewFile) {
    process.stdout.write(
      `${OPERATION_FAILED}File already exists: ${newFile} \n`
    );
    return;
  }

  try {
    await promiseRename(currentFile, newFile);
  } catch (error) {
    process.stdout.write(OPERATION_FAILED);
  }
};
