import { stat } from 'fs/promises';
import { createWriteStream, createReadStream } from 'fs';
import { OPERATION_FAILED } from '../utils/constants.js';
import path from 'path';

export const copy = async (currentDir, fileName, newDir) => {
  const file = path.resolve(currentDir, fileName);
  const newFolder = path.resolve(currentDir, newDir);
  const newFile = path.resolve(newFolder, fileName);

  // проверка, что указаны именно файл и папка и они существуют
  try {
    const statsFile = await stat(file);
    const statsFolder = await stat(newFolder);
    if (!statsFile.isFile() || !statsFolder.isDirectory) {
      process.stdout.write(OPERATION_FAILED);
      return false;
    }

    const ws = createWriteStream(newFile, { flags: 'ax' });

    // если файл с таким именем уже существует
    ws.on('error', () => {
      process.stdout.write(
        `${OPERATION_FAILED}File already exists: ${newFile} \n`
      );
      return false;
    });

    const rs = createReadStream(file);
    rs.pipe(ws);
  } catch {
    process.stdout.write(OPERATION_FAILED);
    return false;
  }

  return true;
};
