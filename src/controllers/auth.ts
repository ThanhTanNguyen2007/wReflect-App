import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { ZodError } from 'zod';

import logger from '../logger';
import config from '../config';
import { setCookie } from '../helpers';
import * as validators from './validators/auth';
import * as services from '../services';
import { RequestWithUserInfo } from '../types';

export const login = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { body } = validators.login(req);
    const { email, email_verified: isEmailVerified, picture } = await services.auth0.exchangeCodeForToken(body.code);
    if (!isEmailVerified) {
      return res.send({ email, requiresEmailVerification: !isEmailVerified, picture });
    }
    const user = await services.user.findOrCreateUserByEmail(email, picture);
    const session = await services.session.createSession(user.id, config.SESSION_DURATION_MINUTES);

    const oneDayInMilliseconds = config.SESSION_DURATION_MINUTES * 60 * 1000;
    setCookie('email', email, oneDayInMilliseconds, res);
    setCookie('token', session.token, oneDayInMilliseconds, res);
    return res.send({ email });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.errors);
    }
    logger.info(error);
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};

export const logout = async (req: RequestWithUserInfo, res: Response): Promise<void | Response> => {
  try {
    const { cookies } = validators.logout(req);
    await services.session.endSession(req.user.id, cookies.token);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.errors);
    }
    logger.info(error);
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};
