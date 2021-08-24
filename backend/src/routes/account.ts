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

    const hasSlackAccessToken =
      typeof account.slackAccessToken === 'string' && account.slackAccessToken.length > 0;
    const hasSlackChannelId =
      typeof account.slackChannelId === 'string' && account.slackChannelId.length > 0;

    const isSlackAuthenticated = hasSlackAccessToken && hasSlackChannelId;
    const isShopifyAuthenticated =
      typeof account.shopifyAccessToken === 'string' && account.shopifyAccessToken.length > 0;

    const response = { email: account.email, isSlackAuthenticated, isShopifyAuthenticated };

    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
