import Joi from 'joi';
const comments = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required(),
    publishedAt: Joi.string().required(),
    content: Joi.string().required().min(2),
  }),
};

export default { comments };
