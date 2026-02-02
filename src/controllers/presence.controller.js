import { asyncHandler } from '../utils/asyncHandler.js';
import * as presenceService from '../services/presence.service.js';

export const logPresence = asyncHandler(async (req, res) => {
  const { url } = req.body ?? {};

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid url' });
  }

  const userId = 1;
  await presenceService.logPresence(userId, url);

  res.status(204).end();
});

export const listPresence = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const rows = await presenceService.listPresence(limit);
  res.json(rows);
});
