import path from 'path';

export const getUpDir = (currentDir) => {
  return path.dirname(currentDir);
};
