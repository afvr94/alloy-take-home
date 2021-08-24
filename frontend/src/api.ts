import axios, { AxiosPromise } from 'axios';

// TODO: process.env.BACKEND_URL
const HOST = 'http://localhost:8080';

const API = axios.create({
  baseURL: HOST,
});

export const login = (email: string, password: string): AxiosPromise<{ slackAccessToke: string }> =>
  API.post('/auth/login', { email, password });

export const register = (
  email: string,
  password: string
): AxiosPromise<{ slackAccessToke: string }> => API.post('/auth/register', { email, password });

export const getSlackUrl = (): AxiosPromise<{ url: string }> =>
  API.get('/slack/url', {
    headers: {
      auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZGllbEBnbWFpbC5jb20iLCJpZCI6IjYxMjMwODhiMDBkMzZiN2QwMmFmNDY3MCIsImlhdCI6MTYyOTc0MjIyNCwiZXhwIjoxNjI5NzQ1ODI0fQ.ka9ijdNRlW6xsWa-DInoiHQK8rWwf8C3h0KoVC0oxyQ',
    },
  });

export const getShopifyUrl = (): AxiosPromise<{ url: string }> =>
  API.get('/shopify/url', {
    headers: {
      auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZGllbDAxN0BnbWFpbC5jb20iLCJpZCI6IjYxMjMwODhiMDBkMzZiN2QwMmFmNDY3MCIsImlhdCI6MTYyOTc2MjMyNSwiZXhwIjoxNjI5NzY1OTI1fQ.BFHglkxTUYtsjJIYj--9aE14U_qMyMJbucbQ6BfFB6Q',
    },
  });
