import dotenv from 'dotenv';
import express, { Application, json, urlencoded } from 'express';
import routes from './routes';
import db from './db';

dotenv.config();

const app: Application = express();
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
