import * as familiasService from '../services/familias.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listFamilias = asyncHandler(async (req, res) => {
  const familias = await familiasService.listFamilias(
    req.params.categoriaId,
    req.params.subcategoriaId
  );
  res.json(familias);
});

export const getFamilia = asyncHandler(async (req, res) => {
  const familia = await familiasService.getFamilia(
    req.params.categoriaId,
    req.params.subcategoriaId,
    req.params.id
  );
  res.json(familia);
});
