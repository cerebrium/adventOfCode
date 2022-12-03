import axios from 'axios';
import * as fs from 'fs';
import {Router} from 'express';

const router = Router();

const findLatestDay = (): number => {
  const today = new Date();

  return today.getDate();
};

const createTheText = ({input, num}: {input: any; num: number}): string => {
  const localText = input.toString();
  const splitText = localText.split('main')[1];
  const formattedText = splitText.substring(1, splitText.length - 3);
  const beginning = `<!DOCTYPE html><html><head><title>Question ${num}</title></head><main>`;
  const end = '</main></html>';
  return beginning.concat(formattedText.concat(end));
};

const writeQuestionToFile = async (questionNum: number): Promise<void> => {
  const todaysQuestion = await axios.get(
    `https://adventofcode.com/2022/day/${questionNum}`
  );

  if (todaysQuestion.data) {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(
        `${__dirname}/questions/${questionNum}.html`,
        createTheText({input: todaysQuestion.data, num: questionNum}),
        err => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }
};

const writeDirectoryForQuestions = async (): Promise<void> => {
  return new Promise((resolve, reject): void => {
    fs.mkdir(`${__dirname}/questions/`, (err): void => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

async function main(): Promise<number> {
  const questionToFetch = findLatestDay();

  // Write Directory
  if (!(await fs.existsSync(`${__dirname}/questions`))) {
    writeDirectoryForQuestions();
  }

  // Write file and then serve
  if (
    !(await fs.existsSync(`${__dirname}/questions/${questionToFetch}.html`))
  ) {
    await writeQuestionToFile(questionToFetch);
  }

  return questionToFetch;
}
router.get('/', async (req, res) => {
  const questionToFetch = await main();
  res.sendFile(`${__dirname}/questions/${questionToFetch}.html`);
});

export default router;
