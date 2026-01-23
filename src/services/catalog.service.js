import * as repo from '../repositories/catalog.repo.js';

export async function listCategorias() {
  return repo.getCategorias();
}

export async function getCategoriaWithTree(id) {
  const tree = await repo.getCategoriaTree(id);
  if (!tree) {
    throw new Error('NOT_FOUND');
  }
  return tree;
}
