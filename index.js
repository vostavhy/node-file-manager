import readLine from 'readline';
import { printGreetings, exitFunc } from './cli/messages.js';
import { argv, stdin } from 'process';

printGreetings(argv);

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
