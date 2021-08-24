import axios, { AxiosPromise } from 'axios';

type RegisterParams = {
  email: string;
  password: string;
  shopifyUrl: string;
};

type LoginParams = {
  email: string;
  password: string;
};

const HOST = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const API = axios.create({
  baseURL: HOST,
});

API.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-member-access
      config.headers.Authorization = `${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = ({ email, password }: LoginParams): AxiosPromise<{ token: string }> =>
  API.post('/auth/login', { email, password });

export const register = ({ email, password, shopifyUrl }: RegisterParams): AxiosPromise =>
  API.post('/auth/register', { email, password, shopifyUrl });

export const fetchAccount = (): AxiosPromise<{
  email: string;
  isSlackAuthenticated: boolean;
  isShopifyAuthenticated: boolean;
}> => API.get('/account');

export const fetchSlackUrl = (): AxiosPromise<{ url: string }> => API.get('/slack/url');

export const fetchShopifyUrl = (): AxiosPromise<{ url: string }> => API.get('/shopify/url');
