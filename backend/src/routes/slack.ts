import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { checkJwt } from '../middleware';
import { Account } from '../model';

type SlackOAuthResponse = {
  ok: boolean;
  authed_user: {
    access_token: string;
  };
  access_token: string;
  incoming_webhook: {
    channel_id: string;
  };
};

type SlackUserResponse = {
  ok: boolean;
  user: {
    email: string;
  };
};

dotenv.config();

const router = Router();

router.get('/url', [checkJwt], (req: Request, res: Response) => {
  const clientId = process.env.SLACK_CLIENT_ID || '';
  // url to authorize to install slack app
  const SLACK_OAUTH_URL = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=channels:join,chat:write,chat:write.customize,chat:write.public,incoming-webhook&user_scope=identity.basic,identity.email`;
  res.json({ url: SLACK_OAUTH_URL });
});

router.get('/oauth_redirect', async (req: Request, res: Response) => {
  if (!req.query.code) {
    res.status(400).send('Missing Slack code');
    return;
  }
  try {
    // data send to slack oauth request
    const data = {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code,
    };
    // requesting slack oauth
    const authDetails: AxiosResponse<SlackOAuthResponse> = await axios.post(
      'https://slack.com/api/oauth.v2.access',
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    // check is slack gives us an ok :)
    if (!authDetails.data.ok) {
      res.status(400).send('Slack could not auth');
      return;
    }

    // get the user that authenticated
    const authUser = authDetails.data.authed_user;

    // requesting slack user identity
    const user: AxiosResponse<SlackUserResponse> = await axios.get(
      `https://slack.com/api/users.identity`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authUser.access_token}`,
        },
      }
    );

    // check is slack gives us an ok :)
    if (!user.data.ok) {
      res.status(400).send('Slack could not find user');
      return;
    }

    // if everything is okay time to save out data
    const {
      access_token: slackAccessToken,
      incoming_webhook: { channel_id: slackChannelId },
    } = authDetails.data;

    try {
      // save necessary slack information to slack
      await Account.where({ email: user.data.user.email })
        .updateMany({
          slackAccessToken,
          slackChannelId,
        })
        .exec();
      res.redirect(`${process.env.FRONTEND_URL || ''}/auth`);
    } catch (err) {
      res.status(404).send('Account with that slack email was not found.');
      return;
    }
  } catch (err) {
    // if any og the request fails then throw bad response
    res.status(400).send(err);
  }
});

export default router;
