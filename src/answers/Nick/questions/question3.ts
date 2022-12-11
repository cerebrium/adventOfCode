import * as fs from 'fs';
/*


sample data: vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw


answer: each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

*/

export const sampleData = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

const priorities = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

// ONE
// function findTotal(input: string) {
//   const items = input.split('\n');

//   console.log('items: ', items);
//   let total = 0;

//   for (const list of items) {
//     const half = Math.floor(list.length / 2);
//     const [ruckOne, ruckTwo] = [
//       new Set(list.substring(0, half)),
//       new Set(list.substring(half)),
//     ];

//     let common = null;
//     ruckOne.forEach(el => {
//       if (ruckTwo.has(el)) common = el;
//     });

//     if (common) total += priorities[common];
//   }

//   return total;
// }

// TWO
function findTotal(input: string) {
  const items = input.split('\n');
  let total = 0;

  /*

    for each group of three, make sets from each row
    then find what exists in all

  */

  for (let i = 3; i < items.length + 1; i += 3) {
    const currentGroup = items.slice(i - 3, i);
    const [one, two, three] = currentGroup.map(el => new Set(el));

    const unionOneTwo = [];

    one.forEach(el => {
      if (two.has(el)) unionOneTwo.push(el);
    });

    const oneTwoThreeUnion = unionOneTwo.filter(el => three.has(el));

    total += priorities[oneTwoThreeUnion[0]];
  }

  return total;
}

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input3.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(findTotal(data));
      }
    );
  });
}

export default main;
