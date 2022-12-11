import * as fs from 'fs';

// Practice data
// mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26

function tuningTrouble(input: string) {
  let start = 0;
  let finish = 14;

  while (start < input.length) {
    const currentSet = new Set(input.substring(start, finish));
    if (currentSet.size > 13 && finish > 14) break;
    finish++;
    start++;
  }

  return finish;
}

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input6.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(tuningTrouble(data));
      }
    );
  });
}

export default main;
