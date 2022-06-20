import { stat } from 'fs/promises';
import {
  STATUS_OK,
  STATUS_ERROR,
  OPERATION_FAILED,
} from '../utils/constants.js';
import { getUpDir } from './up.js';

import path from 'path';

export const getCdObj = async (currentDir, newDir) => {
  if (newDir === '..') {
    const newPath = getUpDir(currentDir);
    return {
      status: STATUS_OK,
      path: newPath,
    };
  }

  try {
    const newPath = path.resolve(currentDir, newDir);
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: newPath,
      };
    }
  } catch {
    process.stdout.write(OPERATION_FAILED);
  }

  return { status: STATUS_ERROR };
};
