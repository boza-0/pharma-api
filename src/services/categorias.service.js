import * as categoriasRepo from '../repositories/categorias.repo.js';

export async function listCategorias() {
  return categoriasRepo.listCategorias();
}

export async function getCategoria(id) {
  const categoria = await categoriasRepo.getCategoriaById(id);

  if (!categoria) {
    throw new Error('NOT_FOUND');
  }

  return categoria;
}
