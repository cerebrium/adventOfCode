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

function main(items: string[]) {
  const rucksackStoreOne = [];
  const rucksackStoreTwo = [];

  for (const listItems of items) {
    console.log('LIST ITEM: ', listItems);
    rucksackStoreOne.push(
      Array.from(
        new Set(listItems.slice(0, listItems.length / 2 + 1).split(''))
      )
    );
    rucksackStoreTwo.push(
      new Set(listItems.slice(listItems.length / 2).split(''))
    );
  }

  const foundItems: string[] = [];

  for (let i = 0; i < rucksackStoreOne.length; i++) {
    const rucksackTwoSet = rucksackStoreTwo[i];
    const itemsInSacks: string[] = [];

    for (const item of rucksackStoreOne[i]) {
      if (rucksackTwoSet.has(item)) {
        console.log('ITEM: ', item);
        itemsInSacks.push(item);
      }
    }
    if (itemsInSacks.length) foundItems.push(...itemsInSacks);
  }

  return foundItems.reduce((acc, curr: string) => {
    return (acc += (priorities as any)[curr]);
  }, 0);
}

export default main;
