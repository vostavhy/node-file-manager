import { stdout, exit } from 'process';
import { OPERATION_FAILED } from './constants.js';
let userName = '';

export const printGreetings = (args) => {
  userName = args[2].replace('--username=', '');
  stdout.write(`Welcome to the File Manager, ${userName}! \n`);
};

export const exitFunc = () => {
  stdout.write(`\nThank you for using File Manager, ${userName}! \n`);
  exit();
};

export const printDir = (dirToPrint) => {
  stdout.write(`\nYou are currently in ${dirToPrint} \n`);
};

export const printError = () => {
  console.log(OPERATION_FAILED);
};
