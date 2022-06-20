import os from 'os';

export const printEOL = () => {
  console.log(JSON.stringify(os.EOL));
};
