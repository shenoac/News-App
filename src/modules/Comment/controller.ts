import type { Request, Response } from 'express';
import type { CommentType } from '../../types/types.js';
import { AppDataSource } from '../../config/database.js';
import { News } from '../../entities/News.js';
import { Comment } from '../../entities/Comment.js';

const commentRepository = AppDataSource.getRepository(Comment);
const newsRepository = AppDataSource.getRepository(News);

const commentOnNewsArticle = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { newsId } = req.query;
  const { content, timeStamp } = req.body;

  if (!newsId || typeof newsId !== 'string') {
    res.status(400).send({ message: 'Invalid newsId' });
    return;
  }
  if (!userId || typeof userId !== 'string') {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }
  if (!content || typeof content !== 'string' || content.length === 0) {
    res.status(400).send({ message: 'Comment content is required' });
    return;
  }

  try {
    const parsedId = parseInt(newsId);
    const newsArticle = await newsRepository.findOneBy({ newsId: parsedId });

    if (!newsArticle) {
      res.status(404).send({ message: 'News article not found' });
      return;
    }

    const comment: CommentType = {
      id: `${newsId}-${Date.now()}`,
      userId,
      newsId,
      content,
      timeStamp: new Date(timeStamp),
    };

    // check this
    await commentRepository.save(comment);

    res.status(201).send({ message: 'Comment added successfully' });
  } catch (err: any) {
    res.status(500).send({
      message: 'Error in commenting on the news article',
      error: err.message,
    });
  }
};

export default { commentOnNewsArticle };
