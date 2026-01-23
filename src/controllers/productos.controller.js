import * as service from '../services/productos.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listProductos = asyncHandler(async (req, res) => {
  const productos = await service.searchProductos({
    q: req.query.q,
    categoriaId: req.query.categoriaId,
    subcategoriaId: req.query.subcategoriaId,
    familiaId: req.query.familiaId,
    inStock: req.query.inStock === 'true'
  });

  res.json(productos);
});
