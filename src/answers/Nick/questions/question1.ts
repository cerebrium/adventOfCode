import * as fs from 'fs';

const sumIncomingData = (data: string): number => {
  const coagulatedData = data
    .split('\n\n')
    .map(el => el.replace(/\n/g, ' '))
    .map((el: string) => {
      const currentRow = el.split(' ').reduce((acc, curr): number => {
        return (acc += Number(curr));
      }, 0);

      return currentRow;
    });

  // Terrible! :D but need to get these done!
  const sortedData = coagulatedData.sort((a, b) => b - a);
  const topThree = sortedData.slice(0, 3);

  return topThree.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
};

function main() {
  fs.readFile(
    `${__dirname}/../../../../../assets/Nick/inputs/input1.txt`,
    'utf8',
    (err, data): void => {
      if (err) {
        console.log(err);
      }
      sumIncomingData(data);
    }
  );
}

export default main;
