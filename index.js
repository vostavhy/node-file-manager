import { printGreetings, printDir, exitFunc } from './cli/messages.js';
import { argv, stdin, stdout } from 'process';
import { getUpDir } from './navigation/up.js';
import { getCdObj } from './navigation/cd.js';
import { getList } from './navigation/list.js';
import { readFile } from './files/cat.js';
import { createFile } from './files/add.js';
import { rename } from './files/rename.js';
import { remove } from './files/remove.js';
import { printEOL } from './os/eol.js';
import { printCPUInfo } from './os/cpu.js';

import {
  INVALID_INPUT,
  OPERATION_FAILED,
  STATUS_OK,
} from './utils/constants.js';

import readLine from 'readline';
import os from 'os';
import { copy } from './files/copy.js';

let currentDir = os.homedir();

printGreetings(argv);
printDir(currentDir);

const rl = readLine.createInterface({ input: stdin });

rl.on('line', async (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitFunc();
      break;

    case 'up':
      currentDir = getUpDir(currentDir);
      printDir(currentDir);
      break;

    case 'cd':
      const [newDir] = args;
      const cdObj = await getCdObj(currentDir, newDir);
      if (cdObj.status === STATUS_OK) {
        currentDir = cdObj.path;
        printDir(currentDir);
      } else {
        stdout.write(OPERATION_FAILED);
      }
      break;

    case 'ls':
      const list = await getList(currentDir);
      console.log(list);
      printDir(currentDir);
      break;

    case 'cat':
      const [fileDir] = args;
      readFile(currentDir, fileDir);
      printDir(currentDir);
      break;

    case 'add':
      const [fileName] = args;
      createFile(currentDir, fileName);
      printDir(currentDir);
      break;

    case 'rn':
      const [currentFile, newFile] = args;
      rename(currentDir, currentFile, newFile);
      printDir(currentDir);
      break;

    case 'copy':
      const [file, folder] = args;
      copy(currentDir, file, folder);
      printDir(currentDir);
      break;

    case 'rm':
      const [fileNameRemove] = args;
      remove(currentDir, fileNameRemove);
      printDir(currentDir);
      break;

    case 'mv':
      const [pathToFile, pathToNewDirectory] = args;
      copy(currentDir, pathToFile, pathToNewDirectory);
      remove(currentDir, pathToFile);
      printDir(currentDir);
      break;

    case 'os':
      const [arg] = args;
      switch (arg) {
        case '--EOL':
          printEOL();
          break;

        case '--cpus':
          printCPUInfo();
          break;

        default:
          stdout.write(INVALID_INPUT);
          break;
      }
      break;

    default:
      stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitFunc);
