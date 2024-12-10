import type { Request, Response } from 'express';
import type { CommentType } from '../../types/types.js';
import { AppDataSource } from '../../config/database.js';
import { News } from '../../entities/News.js';
import { Comment } from '../../entities/Comment.js';

const commentRepository = AppDataSource.getRepository(Comment);
const newsRepository = AppDataSource.getRepository(News);

const commentOnNewsArticle = async (req: Request, res: Response) => {
  //   Accept a valid newsId and comment content from the user.
  const userId = req.user?.id;
  const { newsId } = req.query;
  const { content, timeStamp } = req.body;

  // Validate the inputs (e.g., ensure newsId exists and comment content is not empty).
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

    await commentRepository.save(comment);

    res.status(201).send({ message: 'Comment added successfully' });
  } catch (err: any) {
    res.status(500).send({
      message: 'Error in commenting on the news article',
      error: err.message,
    });
  }

  // Authenticate the user to ensure only authorized users can add comments.
  // Save the comment to the database with relevant details such as userId, newsId, comment content, and timestamp.
  // Return a success message when you add the comment.
  // Provide appropriate error responses for invalid inputs or authentication failures.
};

export default { commentOnNewsArticle };
