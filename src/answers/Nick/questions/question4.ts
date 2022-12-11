import * as fs from 'fs';

export const sampleData = [
  '2-4,6-8',
  '2-3,4-5',
  '5-7,7-9',
  '2-8,3-7',
  '6-6,4-6',
  '2-6,4-8',
];

// ONE
// function campCleanup(input: string) {
//   const data = input.split('\n');

//   let totalEclipses = 0;
//   for (const line of data) {
//     const [rangeOne, rangeTwo] = line.split(',');
//     const [[lowOne, highOne], [lowTwo, highTwo]] = [
//       rangeOne.split('-').map(el => Number(el)),
//       rangeTwo.split('-').map(el => Number(el)),
//     ];

//     /*

//         Check if one eclipses two

//       */
//     if (lowOne <= lowTwo) {
//       if (highOne >= highTwo) {
//         totalEclipses++;
//         continue;
//       }
//     }

//     /*

//         Check if two eclipses one

//       */

//     if (lowTwo <= lowOne) {
//       if (highTwo >= highOne) {
//         totalEclipses++;
//       }
//     }
//   }

//   return totalEclipses;
// }

// TWO
function campCleanup(input: string) {
  const data = input.split('\n');

  let totalEclipses = 0;
  for (const line of data) {
    const [rangeOne, rangeTwo] = line.split(',');
    const [[lowOne, highOne], [lowTwo, highTwo]] = [
      rangeOne.split('-').map(el => Number(el)),
      rangeTwo.split('-').map(el => Number(el)),
    ];

    if (
      (lowOne >= lowTwo && lowOne <= highTwo) ||
      (highOne >= lowTwo && highOne <= highTwo)
    ) {
      totalEclipses++;
      continue;
    }

    if (
      (lowTwo >= lowOne && lowTwo <= highOne) ||
      (highTwo >= lowOne && highTwo <= highOne)
    ) {
      totalEclipses++;
    }
  }

  return totalEclipses;
}

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input4.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(campCleanup(data));
      }
    );
  });
}

export default main;
