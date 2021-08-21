import dotenv from 'dotenv';
import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import routes from './routes';
import db from './db';

dotenv.config();

const app: Application = express();
// TODO: CHECK
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening on port 👉🏼  http://localhost:${PORT}!`);
      });
    } catch (err) {
      console.log('Error listing to server: ', err);
    }
  })
  .catch((err) => console.log(err));
