import {Router} from 'express';
import axios from 'axios';
import * as fs from 'fs';
import {parse} from 'node-html-parser';
import {Stream} from 'stream';

const router: Router = Router();

const findLatestDay = (): number => {
  const today = new Date();

  return today.getDate();
};

const createTheText = (html: string): string => {
  let parsedHtml = parse(html);
};

const writeQuestionToFile = async (questionNum: number): Promise<void> => {
  const todaysQuestion = await axios.get(
    `https://adventofcode.com/2022/day/${questionNum}`
  );
  console.log('TODAYS QUESTION: ', todaysQuestion);
  console.log('todays question: ', todaysQuestion.data);

  if (todaysQuestion.data) {
    const textToWrite = createTheText(todaysQuestion.data);
    const stream = new Stream();
    stream.pipe(data => {
      data.write(textToWrite);
    });
    return new Promise<void>((resolve, reject): void => {
      writableStream.pipe(
        fs
          .createWriteStream(`${__dirname}/questions/${questionNum}`, {
            flags: 'r+',
          })
          .on('finish', (): void => resolve())
          .on('error', e => {
            console.log('Error', e);
            reject();
          })
      );
    });
  }
};

const writeFileForQuestion = async (questionNum: number): Promise<void> => {
  return new Promise<void>((resolve, reject): void => {
    fs.writeFile(
      `${__dirname}/questions/${questionNum}`,
      'none',
      (err): void => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
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

router.get('/', async (_, res): Promise<void> => {
  const questionToFetch = findLatestDay();

  // Write Directory
  if (!(await fs.existsSync(`${__dirname}/questions`))) {
    writeDirectoryForQuestions();
  }

  // Write file and then serve
  if (!(await fs.existsSync(`${__dirname}/questions/${questionToFetch}`))) {
    await writeFileForQuestion(questionToFetch);
    await writeQuestionToFile(questionToFetch);
  }

  res.sendFile(`${__dirname}/questions/${questionToFetch}`);
});

export default router;
