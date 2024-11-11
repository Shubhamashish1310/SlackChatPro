import express from 'express';

import v1Routes from '../Routes/v1/v1Routes.js';
const router = express.Router();


router.use('/user',v1Routes)

export default router;