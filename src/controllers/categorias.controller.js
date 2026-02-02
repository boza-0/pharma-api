import * as categoriasService from '../services/categorias.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listCategorias = asyncHandler(async (req, res) => {
  const categorias = await categoriasService.listCategorias();
  res.json(categorias);
});

export const getCategoria = asyncHandler(async (req, res) => {
  const categoria = await categoriasService.getCategoria(req.params.id);
  res.json(categoria);
});
