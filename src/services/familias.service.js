import * as subcategoriasRepo from '../repositories/subcategorias.repo.js';
import * as familiasRepo from '../repositories/familias.repo.js';

export async function listFamilias(categoriaId, subcategoriaId) {
  const subcategoria = await subcategoriasRepo.getSubcategoriaById(
    categoriaId,
    subcategoriaId
  );

  if (!subcategoria) {
    throw new Error('NOT_FOUND');
  }

  return familiasRepo.listFamiliasBySubcategoria(
    categoriaId,
    subcategoriaId
  );
}

export async function getFamilia(categoriaId, subcategoriaId, id) {
  const familia = await familiasRepo.getFamiliaById(
    categoriaId,
    subcategoriaId,
    id
  );

  if (!familia) {
    throw new Error('NOT_FOUND');
  }

  return familia;
}
