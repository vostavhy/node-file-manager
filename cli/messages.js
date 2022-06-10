import { stdout, exit } from 'process';
let userName = '';

export const printGreetings = (args) => {
  userName = args[2].replace('--username=', '');
  stdout.write(`Welcome to the File Manager, ${userName}! \n`);
};

export const exitFunc = () => {
  stdout.write(`\nThank you for using File Manager, ${userName}! \n`);
  exit();
};
