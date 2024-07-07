import express from 'express';
import { getOrganisations, getOrganisationById, createOrganisation, addUserToOrganisation } from "../controllers/organisationsController.js"
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Route to get organisations (protected)
router.get('/organisations', authenticate, getOrganisations);
router.get('/organisations/:orgId', authenticate, getOrganisationById);
router.put('/organisations', authenticate, createOrganisation);
router.post('/organisations/:orgId/users', authenticate, addUserToOrganisation);


export default router;
