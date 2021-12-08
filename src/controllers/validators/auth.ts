import { Request } from 'express';
import * as z from 'zod';

export const login = (req: Request) => {
  const schema = z.object({
    body: z.object({
      code: z.string(),
    }),
  });
  return schema.parse(req);
};

export const logout = (req: Request) => {
  const schema = z.object({
    cookies: z.object({
      token: z.string(),
    }),
  });
  return schema.parse(req);
};
