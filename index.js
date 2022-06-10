import { printGreetings, printCurrentDir, exitFunc } from './cli/messages.js';
import { argv, stdin } from 'process';
import readLine from 'readline';
import os from 'os';

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
      console.log(args);
      break;
  }
});

process.on('SIGINT', exitFunc);
