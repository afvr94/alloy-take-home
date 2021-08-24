import dotenv from 'dotenv';
import express, { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import db from './db';

dotenv.config();

const app: Application = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is listening to 👉🏼  http://localhost:${PORT}!`);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error listing to server: ', err);
    }
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));
