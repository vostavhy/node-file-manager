import readLine from 'readline';
import { printGreetings, exitFunc } from './cli/messages.js';
import { argv, stdin } from 'process';

printGreetings(argv);

const rl = readLine.createInterface({ input: stdin });

process.on('SIGINT', exitFunc);
