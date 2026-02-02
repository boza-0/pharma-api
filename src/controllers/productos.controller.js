import * as productosService from '../services/productos.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listProductos = asyncHandler(async (req, res) => {
  const productos = await productosService.listProductos(
    req.params.categoriaId,
    req.params.subcategoriaId,
    req.params.familiaId
  );
  res.json(productos);
});

export const getProducto = asyncHandler(async (req, res) => {
  const producto = await productosService.getProducto(
    req.params.categoriaId,
    req.params.subcategoriaId,
    req.params.familiaId,
    req.params.id
  );
  res.json(producto);
});
