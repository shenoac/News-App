import { Router } from 'express';
import authMiddleware from '../../middleware/auth.js';
import commentsController from '../Comment/controller.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import commentsValidationSchema from './validation.js';

const router = Router({ mergeParams: true });

router.post(
  '/',
  authMiddleware,
  validateRequest(commentsValidationSchema.comments),
  commentsController.commentOnNewsArticle,
);

export default router;
