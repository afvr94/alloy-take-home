import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_HOSTNAME = process.env?.MONGO_HOSTNAME || '';

const db = {
  connect: (): Promise<void> =>
    new Promise((resolve, reject) => {
      mongoose
        .connect(MONGO_HOSTNAME, {
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
