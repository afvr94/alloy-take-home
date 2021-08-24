import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const HOSTNAME = process.env?.MONGO_HOSTNAME || '';
const DB = process.env.MONGO_DB || '';

const db = {
  connect: (): Promise<void> =>
    new Promise((resolve, reject) => {
      mongoose
        .connect(`mongodb://${HOSTNAME}/${DB}`, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Database is connected');
          resolve();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(`Connection error: ${JSON.stringify(err)}`);
          reject(new Error(`Error in connection to database: ${JSON.stringify(err)}`));
        });
    }),
  disconnect: (): Promise<void> => mongoose.connection.close(),
};

export default db;
