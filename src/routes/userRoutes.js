import express from 'express';
import {getUsers, getuserInfoById} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', authenticate, getUsers);
router.get('/users/:id', authenticate, getuserInfoById);

export default router;