import { Router, Request, Response } from 'express';
import { checkJwt } from '../middleware';
import { Account } from '../model';

const router = Router();

router.get('/', [checkJwt], async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id } = res.locals.jwtPayload;
  try {
    const account = await Account.findById(id).exec();
    if (!account) {
      res.sendStatus(401);
      return;
    }
    const accountResponse = { ...account.toObject(), password: '' };
    res.json(accountResponse);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
