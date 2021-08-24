import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: () => void): void => {
  const token = <string>req.headers.authorization;
  let jwtPayload;
  const jwtSecret = process.env.JWT_SECRET || 'ALLOYTAKEHOME';
  // Try to validate the token and get data
  try {
    jwtPayload = <{ email: string; id: string }>jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send('Unauthorized');
    return;
  }

  // The token is valid for 1 hour and send a new token every request
  const { email, id } = jwtPayload;
  const newToken = jwt.sign({ email, id }, jwtSecret, {
    expiresIn: '1h',
  });
  res.setHeader('token', newToken);

  next();
};
