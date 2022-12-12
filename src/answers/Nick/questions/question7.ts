import * as fs from 'fs';

/*

  Handle node creation

*/

class directory {
  children = [];
  parent = null;
  name = 'n/a';
  dir = true;
  totalSize = 0;

  constructor({name, parent}: {name: string; parent?: any}) {
    this.parent = parent;
    this.name = name;
  }

  public addChild(child: any) {
    this.children.push(child);
  }
}

class file {
  size = 0;
  parent = null;
  name = 'n/a';

  constructor({size, parent, name}: {size: number; parent: any; name: string}) {
    this.size = size;
    this.parent = parent;
    this.name = name;
  }
}

function noSpaceLeftOnDevice(input: string) {
  const inputStream = input.split('\n');
  // Ignore first command. just make root directory

  const root = new directory({name: '/'});

  let currentLocation: any = root;

  let i = 1;
  while (i < inputStream.length) {
    const command = inputStream[i];

    // Locational command
    if (command.includes('$')) {
      // Go up a directory
      if (command.includes('cd')) {
        if (command.includes('..')) {
          currentLocation = currentLocation.parent;
          i++;
          continue;
        }

        // Parse children for file/directory
        // console.log('current location: ', currentLocation.name, command);
        for (const child of currentLocation.children) {
          if ((child as any).name === command.substring(5)) {
            currentLocation = child;
            i++;
            continue;
          }
        }
      }

      // Create files/directories
      let x = i + 1;
      while (x < inputStream.length && !inputStream[x].includes('$')) {
        const target = inputStream[x];

        // Make a directory
        if (target.includes('dir')) {
          const newDirectory = new directory({
            name: target.substring(4),
            parent: currentLocation,
          });
          currentLocation.addChild(newDirectory);
          x++;
          continue;
        }

        const newFile = new file({
          size: Number(target.match(/\d+/)[0]),
          parent: currentLocation,
          name: target.match(/\D+/)[0].trim(),
        });
        currentLocation.addChild(newFile);
        x++;
      }
      i = x - 1;
    }
    i++;
  }

  return root;
}

function determineSizes(root: any) {
  const iterate = node => {
    /*

      if child is a directory
      resolve the sum of the directory

      add it to the current node

    */
    if (node.dir) {
      for (const child of node.children) {
        node.totalSize += iterate(child);
      }
      return node.totalSize;
    }

    if (!node.dir) return node.size;
  };
  iterate(root);
  return root;
}

// PART ONE
// const parseFileStructure = (node: any) => {
//   const qualifyingDirsAndSizes = [];
//   const iterate = node => {
//     if (node.dir && node.totalSize <= 100000) {
//       qualifyingDirsAndSizes.push([node.name, node.totalSize]);
//     }
//     if (node.children) {
//       for (const child of node.children) {
//         iterate(child);
//       }
//     }
//   };
//   iterate(node);
//   return qualifyingDirsAndSizes;
// };

// function solveTheProblem(data: string) {
//   let sum = 0;
//   const dirsAndSizes = parseFileStructure(
//     determineSizes(noSpaceLeftOnDevice(data))
//   );

//   for (const dir of dirsAndSizes) {
//     const [name, size] = dir;
//     sum += size;
//   }

//   return sum;
// }

// PART TWO

const parseFileStructure = (node: any) => {
  const qualifyingDirsAndSizes = [];
  const iterate = node => {
    if (node.dir) {
      qualifyingDirsAndSizes.push(node.totalSize);
    }
    if (node.children) {
      for (const child of node.children) {
        iterate(child);
      }
    }
  };
  iterate(node);
  return qualifyingDirsAndSizes;
};

function solveTheProblem(data: string) {
  const dirsAndSizes = parseFileStructure(
    determineSizes(noSpaceLeftOnDevice(data))
  );

  const sortedDirsAndSizes = dirsAndSizes
    .sort((a, b) => b - a)
    .map(el => Number(el));

  const currentSpace = 70000000 - sortedDirsAndSizes[0];
  const amountOfSpaceNeeded = currentSpace - 30000000;

  let res = 0;
  for (let i = sortedDirsAndSizes.length - 1; i > 0; i--) {
    const currentValue = sortedDirsAndSizes[i];
    if (currentValue > Math.abs(amountOfSpaceNeeded)) {
      res = currentValue;
      break;
    }
  }

  return [currentSpace, res];
}

async function main(): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      `${__dirname}/../../../../../assets/Nick/inputs/input7.txt`,
      'utf8',
      (err, data): void => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(solveTheProblem(data));
      }
    );
  });
}

export default main;
