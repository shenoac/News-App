import { Router } from 'express';
import auth from '../../middleware/auth.js';
import commentsController from '../Comment/controller.js';

const router = Router();

router.post('/:newsId/comments', auth, commentsController.commentOnNewsArticle);

export default router;
