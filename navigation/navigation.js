import { stat } from 'fs/promises';
import { STATUS_OK, STATUS_ERROR } from '../utils/constants.js';

import path from 'path';

export const getUpDir = (currentDir) => {
  return path.dirname(currentDir);
};

export const getCdDir = async (currentDir, pathToDirectory) => {
  const newPath = path.join(currentDir, pathToDirectory);

  try {
    const stats = await stat(pathToDirectory);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: pathToDirectory,
      };
    }
  } catch {}

  try {
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
