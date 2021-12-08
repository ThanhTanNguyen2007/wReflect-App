import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { ZodError } from 'zod';
import { setCookie } from '../helpers';
import { RequestWithUserInfo, SanitizedUser } from '../types';
import * as services from '../services';
import config from '../config';
import logger from '../logger';
import * as validators from './validators/user';

const clearCookies = (res: Response) => {
  setCookie('email', '', 0, res);
  setCookie('token', '', 0, res);
  return res.send();
};

export const me = async (req: RequestWithUserInfo, res: Response): Promise<void | Response> => {
  try {
    const { cookies } = validators.me(req);
    const email = cookies.email;
    const token = cookies.token;
    // /me is unauthenticated and is the first api call from the dashboard
    // we want to clean dashboard cookies and let it know it is logged out to render the right view
    let sanitizedUser: SanitizedUser | null;
    if (!email || !token) {
      return clearCookies(res);
    } else {
      sanitizedUser = await services.session.checkAndExtendSession(email, token);
      if (!sanitizedUser) {
        return clearCookies(res);
      }
    }

    const oneDayInMilliseconds = config.SESSION_DURATION_MINUTES * 60 * 1000;
    // TODO: Refactor cookie adding and remove to one place
    setCookie('email', email, oneDayInMilliseconds, res);
    setCookie('token', token, oneDayInMilliseconds, res);

    return res.send({
      email: sanitizedUser.email,
      id: sanitizedUser.id,
      isAdmin: sanitizedUser.isAdmin,
      picture: sanitizedUser.picture,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).send(err.errors);
    }
    logger.info(err);
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};
