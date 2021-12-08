import { Router } from 'express';

import { auth, user } from './controllers';

const apiRouter = (): Router => {
  const router = Router();

  router.post('/login', auth.login);
  router.post('/logout', auth.logout);

  router.get('/me', user.me);

  return router;
};

export default apiRouter;
