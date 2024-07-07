import express from 'express';
import {getUsers, getuserInfoById, deleteUserById, updateUser} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', authenticate, getUsers);
router.get('/users/:id', authenticate, getuserInfoById);



router.delete('/user/:id', authenticate, deleteUserById);
router.put('/user/:id', authenticate, updateUser);



export default router;