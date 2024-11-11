import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './Config/dbConfig.js';
import { PORT } from './Config/serverConfig.js';
import apiRoutes from './Routes/apiRoutes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api', apiRoutes)
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    name: 'slackchatpro',
    version: '1.0.0',
    owner: 'Shubham Ashish'
  });
});

app.listen(PORT, () => {
    connectDB();
  console.log('Server is running on port ' + PORT);
});
