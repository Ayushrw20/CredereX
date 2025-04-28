import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/v1', (req: Request, res: Response) => {
  res.json({ message: 'Ready' });
});
