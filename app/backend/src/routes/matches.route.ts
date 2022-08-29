import { Router } from 'express';
import { matchController, matchMiddleware } from '.';

const router = Router();

router.get('/', matchController.getAllMatches);

router.post('/', matchMiddleware.validation, matchController.createMatch);

router.patch('/:id/finish', matchController.isFinished);
/* class MatchRouter {
  public router: Router;

  constructor(
    private _matchesController: MatchesController,
    private _matchesMiddleware: MatchesMiddleware,
  ) {
    this.router = router;
    this.routes();
  }

  public routes(): void {
    this.router.get('/', this._matchesController.getAllMatches);
    this.router.post('/', this._matchesMiddleware.validation, this._matchesController.createMatch);
    this.router.patch('/:id/finished', this._matchesController.isFinished);
  }
}

export default MatchRouter; */

export default router;
