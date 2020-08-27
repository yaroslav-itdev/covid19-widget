import { Router } from 'express';
import StatsRouter from './stats';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/stats', StatsRouter);

// Export the base-router
export default router;
