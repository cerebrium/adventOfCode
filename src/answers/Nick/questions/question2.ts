import * as fs from 'fs';

const baseScores = {
  a: 1,
  x: 1,
  y: 2,
  b: 2,
  c: 3,
  z: 3,
};

const createScores = (data: string) => {
  for (const el of data) {
    console.log('EL: ', el);
  }
};

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(`${__dirname}/inputs/input1.txt`, 'utf8', (err, data): void => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve(createScores(data));
    });
  });
}

export default main;
