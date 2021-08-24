import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { Account } from '../model';

dotenv.config();

const router = Router();

router.post(
  '/register',
  async (
    req: Request<unknown, unknown, { email: string; password: string; shopifyUrl: string }>,
    res
  ) => {
    try {
      const { email, password, shopifyUrl } = req.body;
      if (validator.isEmail(email)) {
        res.status(400).send('Email is invalid');
        return;
      }
      if (validator.isURL(shopifyUrl, { require_protocol: false, require_valid_protocol: false })) {
        res.status(400).send('shopify url is invalid');
        return;
      }
      const account = new Account({ email, password, shopifyUrl });
      account.hashPassword();
      await account.save();
      res.status(201).send('Account created');
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  '/login',
  async (req: Request<unknown, unknown, { email: string; password: string }>, res: Response) => {
    try {
      const { email, password } = req.body;
      const emailLowercase = email.toLowerCase();
      const account = await Account.findOne({ email: emailLowercase }).exec();
      if (!account || !account.comparePassword(password)) {
        res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        return;
      }
      res.json({
        token: jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { email: account.email, id: account._id },
          'ALLOYTAKEHOME',
          { expiresIn: '1h' }
        ),
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default router;
