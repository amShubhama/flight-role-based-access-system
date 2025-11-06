import express from 'express';
import userRoutes from './user.routes.js';
import flightRoutes from './flight.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);

export default router;