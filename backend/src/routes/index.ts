import { Router } from 'express';
import auth from './auth';
import slack from './slack';
import shopify from './shopify';
import account from './account';

const routes = Router();

routes.use('/auth', auth);
routes.use('/slack', slack);
routes.use('/shopify', shopify);
routes.use('/account', account);

export default routes;
