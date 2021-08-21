import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { Account } from './model';

dotenv.config();

const app: Application = express();

app.post(
  '/register',
  async (req: Request<unknown, unknown, { email: string; password: string }>, res) => {
    try {
      const { email, password } = req.body;
      const account = new Account({ email, password });
      await account.save();
      res.status(201).send('Account created');
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

app.post(
  '/login',
  async (req: Request<unknown, unknown, { email: string; password: string }>, res: Response) => {
    try {
      const { email, password } = req.body;
      // TODO: Encrypt password?
      const user = await Account.findOne({ email, password }).exec();
      if (user) {
        res.status(200).send('Logged in');
        return;
      }
      res.status(404).send('User not found');
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

app.post('/shopify_webhook', (req: Request, res: Response) => {
  // TODO
  res.sendStatus(200);
});

export default app;
