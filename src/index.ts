import * as express from 'express';
import helmet from 'helmet';
import question from './routes/index';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());

app.get('/', async (req, res, next): Promise<void> => {
  res.send('Hello World!');
});

app.use('/question', question);

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
});
