import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressFileUpload from 'express-fileupload';
import { graphqlHTTP } from 'express-graphql';
import proxy from 'express-http-proxy';
import StatusCodes from 'http-status-codes';

import sessionManager from './middleware/sessionManager';
import './prisma'; // eager load to test connection
import logger from './logger';
import { unlessStartsWith } from './helpers';
import { apiPaths } from './types';
import config from './config';
import schema from './schema';
import apiRouter from './apiRouter';
import path from 'path';

const app = express();
app.use(expressFileUpload());
app.use(
  cors({
    credentials: true,
    origin: [config.CLIENT_URL, 'http://localhost:3000'],
  }),
);

if (config.NODE_ENV === 'development') {
  // proxy requests to development frontend
  app.use(unlessStartsWith(apiPaths, proxy(config.CLIENT_URL)));
} else {
  // STATIC_DIR gets populated in a whatsapp-self-serve build
  // It comes from the built react folder
  // TODO: build both dashboard and server and test the routing
  app.use(unlessStartsWith(apiPaths, express.static(config.STATIC_DIR)));
}

app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionManager);
app.use('/api', apiRouter());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (error: Error) => {
      return { message: error.message };
    },
  }),
);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = config.PORT || 3000;
app.listen(port, () => {
  logger.info(`server is listening on http://${config.SERVER_URL}:${port}`);
});
