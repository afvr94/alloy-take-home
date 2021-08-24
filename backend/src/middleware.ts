import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: () => void): void => {
  const token = <string>req.headers.authorization;
  let jwtPayload;
  // Try to validate the token and get data
  try {
    jwtPayload = <{ email: string; id: string }>jwt.verify(token, 'ALLOYTAKEHOME');
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send('Unauthorized');
    return;
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { email, id } = jwtPayload;
  const newToken = jwt.sign({ email, id }, 'ALLOYTAKEHOME', {
    expiresIn: '1h',
  });
  res.setHeader('token', newToken);

  next();
};
