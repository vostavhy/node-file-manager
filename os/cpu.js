import os from 'os';

export const printCPUInfo = () => {
  console.log(
    os.cpus().map((cpu) => {
      return {
        model: cpu.model,
        speed: cpu.speed,
      };
    })
  );
};
