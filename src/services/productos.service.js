import * as repo from '../repositories/productos.repo.js';

export async function searchProductos(filters) {
  return repo.searchProductos(filters);
}
