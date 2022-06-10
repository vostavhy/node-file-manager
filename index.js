import { printGreetings, printDir, exitFunc } from './cli/messages.js';
import { argv, stdin, stdout } from 'process';
import { getUpDir } from './navigation/up.js';
import { getCdObj } from './navigation/cd.js';
import { getList } from './navigation/list.js';
import {
  INVALID_INPUT,
  OPERATION_FAILED,
  STATUS_OK,
  STATUS_ERROR,
} from './utils/constants.js';
import readLine from 'readline';
import os from 'os';

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
      break;

    default:
      stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitFunc);
