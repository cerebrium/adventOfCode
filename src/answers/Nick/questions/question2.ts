import * as fs from 'fs';

const sampleData = ['A Y', 'B X', 'C Z'];

const baseScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

/*
  Round One
  a & x: rock,
  y & b: paper,
  c & z: scissor

*/

/*

  Round Two
  x: lose,
  y: draw,
  z: win

*/

// for one
const combinations = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const twoCombinations = {
  X: 0,
  Y: 3,
  Z: 6,
};

// Part one
// function getCurrentLineAndCompare(data: string) {
//   const input = data.split('\n');

//   let score = 0;

//   for (const pair of input) {
//     const [opponent, me] = pair.split(' ');

//     const amount = baseScores[me] + combinations[opponent][me];

//     score += amount;
//   }

//   return score;
// }

// Part Two
function getCurrentLineAndCompare(data: string) {
  const input = data.split('\n');

  let score = 0;

  for (const pair of input) {
    const [opponent, me] = pair.split(' ');

    const amount = twoCombinations[me] + 1;

    score += amount;
  }

  return score;
}

// 10009 --> wrong

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input2.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(getCurrentLineAndCompare(data));
      }
    );
  });
}

export default main;
