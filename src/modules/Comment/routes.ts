import { Router } from 'express';
import authMiddleware from '../../middleware/auth.js';
import commentsController from '../Comment/controller.js';

const router = Router();

router.post(
  '/:newsId/comments',
  authMiddleware,
  commentsController.commentOnNewsArticle,
);

export default router;
