import { Router } from 'express';
import { loginController, loginMiddleware } from '.';

const router = Router();

router.post(
  '/',
  loginMiddleware.requestValidation,
  loginMiddleware.loginApprovalValidation,
  loginController.login,
);

router.get('/validate', loginController.getProfile);

export default router;
