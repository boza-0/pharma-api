import * as subcategoriasService from '../services/subcategorias.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSubcategorias = asyncHandler(async (req, res) => {
  const subcategorias = await subcategoriasService.listSubcategorias(
    req.params.categoriaId
  );
  res.json(subcategorias);
});

export const getSubcategoria = asyncHandler(async (req, res) => {
  const subcategoria = await subcategoriasService.getSubcategoria(
    req.params.categoriaId,
    req.params.id
  );
  res.json(subcategoria);
});
