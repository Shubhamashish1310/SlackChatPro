import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { PORT } from './Config/serverConfig.js';

const app = express();

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    name: 'slackchatpro',
    version: '1.0.0',
    owner: 'Shubham Ashish'
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
