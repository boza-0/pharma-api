import * as presenceRepo from '../repositories/presence.repo.js';

const DEFAULT_LIMIT = 100;

export async function logPresence(userId, url) {
  await presenceRepo.insertPresence(userId, url);
}

export async function listPresence(limit) {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT;
  return presenceRepo.listPresence(safeLimit);
}
