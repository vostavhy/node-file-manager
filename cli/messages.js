export const printGreetings = (args) => {
  const userName = args[2].replace('--username=', '');
  process.stdout.write(`Welcome to the File Manager, ${userName} \n`);
};
