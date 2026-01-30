import * as service from '../services/catalog.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listCategorias = asyncHandler(async (req, res) => {
  const categorias = await service.listCategorias();
  res.json(categorias);
});

export const getCategoria = asyncHandler(async (req, res) => {
  const categoria = await service.getCategoriaWithTree(req.params.id);
  res.json(categoria);
});

export const getSubcategoria = asyncHandler(async (req, res) => {
  const subcategoria = await service.getSubcategoria(
    req.params.categoriaId,
    req.params.id
  );
  res.json(subcategoria);
});
