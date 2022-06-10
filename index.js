import { printGreetings, printDir, exitFunc } from './cli/messages.js';
import { argv, stdin, stdout } from 'process';
import { getUpDir } from './navigation/navigation.js';
import { INVALID_INPUT } from './utils/constants.js';
import readLine from 'readline';
import os from 'os';

let currentDir = os.homedir();

printGreetings(argv);
printDir(currentDir);

const rl = readLine.createInterface({ input: stdin });

rl.on('line', (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitFunc();
      break;

    case 'up':
      currentDir = getUpDir(currentDir);
      printDir(currentDir);
      break;

    default:
      stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitFunc);
