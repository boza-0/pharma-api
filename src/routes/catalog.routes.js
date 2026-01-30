import { Router } from 'express';
import {
  listCategorias,
  getCategoria,
  getSubcategoria,
  getFamilia
} from '../controllers/catalog.controller.js';

const router = Router();

router.get('/categorias', listCategorias);
router.get('/categorias/:id', getCategoria);
router.get('/subcategorias/:categoriaId/:id', getSubcategoria);
router.get('/familias/:categoriaId/:subcategoriaId/:id', getFamilia);

export default router;
