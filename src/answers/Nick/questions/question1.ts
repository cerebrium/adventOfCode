import * as fs from 'fs';

const sumIncomingData = (data: string): number => {
  let currentSum = 0;
  data
    .split('\n\n')
    .map(el => el.replace(/\n/g, ' '))
    .map((el: string): void => {
      const currentRow = el.split(' ').reduce((acc, curr): number => {
        return (acc += Number(curr));
      }, 0);

      if (currentRow > currentSum) currentSum = currentRow;
    });

  return currentSum;
};

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(`${__dirname}/inputs/input1.txt`, 'utf8', (err, data): void => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve(sumIncomingData(data));
    });
  });
}

export default main;
