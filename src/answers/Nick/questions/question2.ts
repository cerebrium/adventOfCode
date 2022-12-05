import * as fs from 'fs';

const baseScores = {
  A: 1,
  X: 1,
  Y: 2,
  B: 2,
  C: 3,
  Z: 3,
};

enum Left {
  a = 'A',
  b = 'B',
  c = 'C',
}
enum Right {
  x = 'X',
  y = 'Y',
  z = 'Z',
}

function* createScores(data: string): Generator<[Left, Right]> {
  let index = 0;
  while (data[index]) {
    const start = index;

    while (data[index] !== '\n') {
      index++;
    }

    yield data.substring(start, index).split(' ') as any;
    index += 1;
    console.log('length: ', data.length, 'index: ', index);
  }
}

const handleComputingScores = (data: string) => {
  const generator = createScores(data);
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const {value, done} = generator.next();
      if (done) break;
      const [left, right] = value;
      if (baseScores[left] === baseScores[right]) {
        console.log('tie');
      }
    }
  } catch (err) {
    console.log('error');
    return err;
  } finally {
    /*

        Final elements

      */

    const {value, done} = generator.next();
    console.log('inside final');
  }
  console.log('finished');
};

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(`${__dirname}/inputs/input2.txt`, 'utf8', (err, data): void => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve(handleComputingScores(data));
    });
  });
}

export default main;
