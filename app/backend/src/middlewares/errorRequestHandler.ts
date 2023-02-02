import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpError from '../errors';
import { TOKEN_INVALID } from '../errors/messages';

const errorRequestHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log('error middleware');

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: TOKEN_INVALID });
  }
  if (error instanceof HttpError) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorRequestHandler;
