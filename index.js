import { printGreetings, printCurrentDir, exitFunc } from './cli/messages.js';
import { argv, stdin, stdout } from 'process';
import readLine from 'readline';
import os from 'os';

const INVALID_INPUT = `Invalid input \n`;
const OPERATION_FAILED = `Operation failed \n`;

let currentDir = os.homedir();

printGreetings(argv);
printCurrentDir(currentDir);

const rl = readLine.createInterface({ input: stdin });

rl.on('line', (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitFunc();
      break;

    default:
      stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitFunc);
