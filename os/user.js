import os from 'os';

export const printUsername = () => {
  try {
    console.log(os.userInfo().username);
  } catch {
    console.log('anonymous');
  }
};
