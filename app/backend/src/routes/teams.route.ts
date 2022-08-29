import { Router } from 'express';
import { teamsController } from '.';

const router = Router();

router.get('/', teamsController.getAllTeams);

router.get('/:id', teamsController.getTeamsById);

/* class TeamRouter {
  public router: Router;

  constructor(private _teamsController: TeamsController) {
    this.router = router;
    this.routes();
  }

  public routes(): void {
    this.router.get('/', this._teamsController.getAllTeams);
    this.router.get('/:id', this._teamsController.getTeamsById);
  }
}

export default TeamRouter; */

export default router;
