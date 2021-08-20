import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { Account } from './model';

dotenv.config();

const app: Application = express();

app.post(
  '/signup',
  async (req: Request<unknown, unknown, { email: string; password: string }>, res) => {
    try {
      const { email, password } = req.body;
      const account = new Account({ email, password });
      await account.save();
      res.status(200).send('Account created');
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

app.post('/shopify_webhook', (req: Request, res: Response) => {
  // TODO
  res.sendStatus(200);
});

export default app;
