import * as categoriasRepo from '../repositories/categorias.repo.js';
import * as subcategoriasRepo from '../repositories/subcategorias.repo.js';

export async function listSubcategorias(categoriaId) {
  const categoria = await categoriasRepo.getCategoriaById(categoriaId);
  if (!categoria) {
    throw new Error('NOT_FOUND');
  }

  return subcategoriasRepo.listSubcategoriasByCategoria(categoriaId);
}

export async function getSubcategoria(categoriaId, id) {
  const subcategoria = await subcategoriasRepo.getSubcategoriaById(
    categoriaId,
    id
  );

  if (!subcategoria) {
    throw new Error('NOT_FOUND');
  }

  return subcategoria;
}
