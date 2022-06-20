import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

export const compress = async (currentDir, pathToFile, pathToDestination) => {
  const filePath = path.resolve(currentDir, pathToFile);
  const archPath = path.resolve(currentDir, pathToDestination);

  await pipeline(
    createReadStream(filePath),
    createBrotliCompress(),
    createWriteStream(archPath, { flags: 'ax' })
  );
};

export const deCompress = async (currentDir, pathToFile, pathToDestination) => {
  const filePath = path.resolve(currentDir, pathToFile);
  const archPath = path.resolve(currentDir, pathToDestination);

  await pipeline(
    createReadStream(filePath),
    createBrotliDecompress(),
    createWriteStream(archPath, { flags: 'ax' })
  );
};
