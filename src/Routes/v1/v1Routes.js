import express from 'express';

import Users from "../v1/Users.js";
const router = express.Router();


router.use('/v1',Users)

export default router;