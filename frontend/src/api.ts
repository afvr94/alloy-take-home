import axios, { AxiosPromise } from 'axios';

// TODO: process.env.BACKEND_URL
const HOST = 'http://localhost:8080';

const API = axios.create({
  baseURL: HOST,
});

export const login = (email: string, password: string): AxiosPromise<{ slackAccessToke: string }> =>
  API.post('/api/login', { email, password });

export const register = (
  email: string,
  password: string
): AxiosPromise<{ slackAccessToke: string }> => API.post('/api/register', { email, password });
