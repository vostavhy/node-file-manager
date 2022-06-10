import { stat } from 'fs/promises';
import { STATUS_OK, STATUS_ERROR } from '../utils/constants.js';
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
    const stats = await stat(newDir);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: newDir,
      };
    }
  } catch {}

  try {
    const newPath = path.join(currentDir, newDir);
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: newPath,
      };
    }
  } catch {}

  return { status: STATUS_ERROR };
};
