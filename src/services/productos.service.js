import * as familiasRepo from '../repositories/familias.repo.js';
import * as productosRepo from '../repositories/productos.repo.js';

export async function listProductos(
  categoriaId,
  subcategoriaId,
  familiaId
) {
  const familia = await familiasRepo.getFamiliaById(
    categoriaId,
    subcategoriaId,
    familiaId
  );

  if (!familia) {
    throw new Error('NOT_FOUND');
  }

  return productosRepo.listProductosByFamilia(
    categoriaId,
    subcategoriaId,
    familiaId
  );
}

export async function getProducto(
  categoriaId,
  subcategoriaId,
  familiaId,
  id
) {
  const producto = await productosRepo.getProductoById(
    categoriaId,
    subcategoriaId,
    familiaId,
    id
  );

  if (!producto) {
    throw new Error('NOT_FOUND');
  }

  return producto;
}
