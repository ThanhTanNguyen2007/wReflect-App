import { Request } from 'express';
import * as z from 'zod';

export const me = (req: Request) => {
  const schema = z.object({
    cookies: z.object({
      email: z.string().optional(),
      token: z.string().optional(),
    }),
  });
  return schema.parse(req);
};
