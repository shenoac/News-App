import type { Request, Response } from 'express';
import { AppDataSource } from '../../config/database.js';
import { News } from '../../entities/News.js';
import { Comment } from '../../entities/Comment.js';

const commentRepository = AppDataSource.getRepository(Comment);
const newsRepository = AppDataSource.getRepository(News);

const commentOnNewsArticle = async (req: Request, res: Response) => {
  const { user } = req;
  const { title, description, source, url, publishedAt, content, timeStamp } =
    req.body;

  console.log('Request body:', req.body);
  console.log('Content:', content);

  if (!user) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }
  if (!content || typeof content !== 'string' || content.length === 0) {
    res.status(400).send({ message: 'Comment content is required' });
    return;
  }

  try {
    let newsArticle = await newsRepository.findOneBy({ url });

    if (!newsArticle) {
      newsArticle = newsRepository.create({
        url,
        publishedAt,
        source,
        description,
        title,
      });
      await newsRepository.save(newsArticle);
    }

    const comment = commentRepository.create({
      content,
      timeStamp: timeStamp ? new Date(timeStamp) : null,
      user,
      news: newsArticle,
    });

    await commentRepository.save(comment);

    res.status(201).send({
      content: comment.content,
      message: 'Comment added successfully',
    });
  } catch (err: any) {
    res.status(500).send({
      message: 'Error in commenting on the news article',
      error: err.message,
    });
  }
};

export default { commentOnNewsArticle };
