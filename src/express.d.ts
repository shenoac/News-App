import 'express';
import type { User } from '../src/entities/User.ts';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
