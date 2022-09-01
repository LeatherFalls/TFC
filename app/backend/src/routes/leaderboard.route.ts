import { Router } from 'express';
import { leaderboardController } from '.';

const router = Router();

router.get('/', leaderboardController.getAll);

export default router;
