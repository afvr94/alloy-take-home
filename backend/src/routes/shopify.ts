import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import { checkJwt } from '../middleware';
import { Account } from '../model';

dotenv.config();

const router = Router();

type ShopifyOAuthResponse = {
  access_token: string;
};

const VALID_STATE = 'alloy-take-home';
const NOTIFICATION_ORDER_PRICE = 100;

router.post(
  '/webhook',
  async (req: Request<unknown, unknown, { subtotal_price: number }>, res: Response) => {
    const shopifyUrl = req.headers['x-shopify-shop-domain'];

    // shopifyUrl could be string[]
    if (!shopifyUrl || typeof shopifyUrl !== 'string') {
      res.status(400).send('Missing shopify url');
      return;
    }

    const { subtotal_price: orderPrice } = req.body;

    if (orderPrice >= NOTIFICATION_ORDER_PRICE) {
      const account = await Account.findOne({ shopifyUrl }).exec();
      if (!account) {
        res.status(404).send('Account not found for shopify url');
        return;
      }
      const data = {
        token: account.slackAccessToken,
        channel: account.slackChannelId,
        text: `Hello, a customer just did an order of ${orderPrice} 🥳🚀`,
      };
      try {
        await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(data));
        res.sendStatus(200);
      } catch {
        res.status(400).send(`Slack could not send message`);
      }
      return;
    }

    res.sendStatus(200);
  }
);

router.get(
  '/url',
  [checkJwt],
  async (req: Request<unknown, unknown, { shop: string }>, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id } = res.locals.jwtPayload;

    const account = await Account.findById(id).exec();

    if (!account || !account.shopifyUrl) {
      res.status(404).send('account not found');
      return;
    }

    const shopifyApiPublicKey = process.env.SHOPIFY_PUBLIC_API_KEY || '';

    const redirectUri = `${process.env.BACKEND_URL || ''}/shopify/callback`;

    const SHOPIFY_OAUTH_URL = `https://${account.shopifyUrl}/admin/oauth/authorize?client_id=${shopifyApiPublicKey}&scope=read_orders&state=${VALID_STATE}&redirect_uri=${redirectUri}`;
    res.json({ url: SHOPIFY_OAUTH_URL });
  }
);

router.get(
  '/callback',
  async (req: Request<unknown, unknown, { shop: string; code: string; state: string }>, res) => {
    const { shop, code, state } = req.query;

    // TODO: BETTER VALIDATE STATE
    if (state !== VALID_STATE || typeof shop !== 'string') {
      res.status(403).send('Cannot be verified');
      return;
    }

    try {
      // data for access token
      const data = {
        client_id: process.env.SHOPIFY_PUBLIC_API_KEY || '',
        client_secret: process.env.SHOPIFY_SECRET_API_KEY || '',
        code,
      };
      // get access token
      const tokenResponse: AxiosResponse<ShopifyOAuthResponse> = await axios.post(
        `https://${shop}/admin/oauth/access_token`,
        data
      );

      const { access_token: shopifyAccessToken } = tokenResponse.data;

      const webhookData = {
        webhook: {
          topic: 'orders/create',
          address: `${process.env.BACKEND_URL || ''}/shopify/webhook`,
          format: 'json',
        },
      };

      await axios.post(`https://${shop}/admin/api/2021-04/webhooks.json`, webhookData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': shopifyAccessToken,
        },
      });
      await Account.where({ shopifyUrl: shop })
        .updateMany({
          shopifyAccessToken,
        })
        .exec();

      res.redirect('http://localhost:3000/auth');
    } catch (err) {
      // if it errors out we log it and return an error.
      res.status(500).send('something went wrong');
    }
  }
);

export default router;
