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

export async function getSubcategoria(categoriaId, id) {
  const subcategoria = await repo.getSubcategoriaById(categoriaId, id);
  if (!subcategoria) {
    throw new Error('NOT_FOUND');
  }

  return {
    id: subcategoria.id,
    nombre: subcategoria.nombre,
    abbreviation: subcategoria.abbreviation,
    categoria: {
      id: subcategoria.categoria_id,
      nombre: subcategoria.categoria_nombre
    }
  };
}

export async function getFamilia(categoriaId, subcategoriaId, id) {
  const familia = await repo.getFamiliaById(categoriaId, subcategoriaId, id);
  if (!familia) {
    throw new Error('NOT_FOUND');
  }

  return {
    id: familia.id,
    nombre: familia.nombre,
    abbreviation: familia.abbreviation,
    subcategoria: {
      id: familia.subcategoria_id,
      nombre: familia.subcategoria_nombre
    },
    categoria: {
      id: familia.categoria_id,
      nombre: familia.categoria_nombre
    }
  };
}

export async function listProductos(
  categoriaId,
  subcategoriaId,
  familiaId
) {
  return await repo.listProductosByFamilia(
    categoriaId,
    subcategoriaId,
    familiaId
  );
}
