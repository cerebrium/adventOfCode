import * as fs from 'fs';

// PART ONE
// function storeCrates(initialInput: {}) {
//   const configuration = initialInput;
//   return ({from, to}: {from: number; to: number}) => {
//     const movingCrate = configuration[from].pop();
//     configuration[to].push(movingCrate);
//     return configuration;
//   };
// }

// function supplyStacks(input: string) {
//   const initialInput = input.split('\n');
//   // Differentiate inital from instructions
//   let instructionsStartOn = 0;

//   // break down by column
//   const columns = [];
//   for (let i = 0; i < initialInput.length; i++) {
//     const currentLine = initialInput[i];

//     const localColumn = [];
//     for (let x = 3; x < currentLine.length + 1; x += 4) {
//       localColumn.push(currentLine.substring(x - 3, x));
//     }
//     instructionsStartOn++;
//     columns.push(localColumn);
//     if (currentLine.length < 1) break;
//   }

//   // Create the initial stacks
//   const initialStructure = {};

//   // get rid of the labelling
//   [1, 2].map(_ => columns.pop());

//   // Create initial arrays
//   for (let i = 0; i < columns.length + 1; i++) {
//     initialStructure[i + 1] = [];
//   }

//   columns.forEach(column => {
//     for (let i = 0; i < column.length; i++) {
//       const element = column[i];

//       if (element.charCodeAt(1) !== 32) {
//         initialStructure[i + 1].unshift(element.charAt(1));
//       }
//     }
//   });
//   // INITIAL STRUCTURE CREATED

//   // Add the structure to the closure of the manipulating function
//   const handleMovingCrate = storeCrates(initialStructure);

//   let finalAnser = null;

//   for (let i = instructionsStartOn; i < initialInput.length; i++) {
//     const instruction = initialInput[i];
//     const [move, from, to] = instruction.match(/\d+/g).map(el => Number(el));
//     for (let x = 0; x < move; x++) {
//       finalAnser = handleMovingCrate({from, to});
//     }
//   }

//   // Structure is finalized. Return the answer
//   const answers = [];

//   for (const property in finalAnser) {
//     if (finalAnser[property].length) answers.push(finalAnser[property].pop());
//   }

//   return answers.join('');
// }

// PART 2
function storeCrates(initialInput: {}) {
  const configuration = initialInput;
  return ({from, to, amount}: {from: number; to: number; amount: number}) => {
    const cratesToMove = configuration[from].splice(
      configuration[from].length - amount,
      amount
    );
    configuration[to].push(...cratesToMove);
    return configuration;
  };
}
function supplyStacks(input: string) {
  const initialInput = input.split('\n');
  // Differentiate inital from instructions
  let instructionsStartOn = 0;

  // break down by column
  const columns = [];
  for (let i = 0; i < initialInput.length; i++) {
    const currentLine = initialInput[i];

    const localColumn = [];
    for (let x = 3; x < currentLine.length + 1; x += 4) {
      localColumn.push(currentLine.substring(x - 3, x));
    }
    instructionsStartOn++;
    columns.push(localColumn);
    if (currentLine.length < 1) break;
  }

  // Create the initial stacks
  const initialStructure = {};

  // get rid of the labelling
  [1, 2].map(_ => columns.pop());

  // Create initial arrays
  for (let i = 0; i < columns.length + 1; i++) {
    initialStructure[i + 1] = [];
  }

  columns.forEach(column => {
    for (let i = 0; i < column.length; i++) {
      const element = column[i];

      if (element.charCodeAt(1) !== 32) {
        initialStructure[i + 1].unshift(element.charAt(1));
      }
    }
  });
  // INITIAL STRUCTURE CREATED

  // Add the structure to the closure of the manipulating function
  const handleMovingCrate = storeCrates(initialStructure);

  let finalAnser = null;

  for (let i = instructionsStartOn; i < initialInput.length; i++) {
    const instruction = initialInput[i];
    const [move, from, to] = instruction.match(/\d+/g).map(el => Number(el));
    finalAnser = handleMovingCrate({from, to, amount: move});
  }

  // Structure is finalized. Return the answer
  const answers = [];

  for (const property in finalAnser) {
    if (finalAnser[property].length) answers.push(finalAnser[property].pop());
  }

  return answers.join('');
}

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input5.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(supplyStacks(data));
      }
    );
  });
}

export default main;
