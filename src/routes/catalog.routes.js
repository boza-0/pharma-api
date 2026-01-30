import { Router } from 'express';
import {
  listCategorias,
  getCategoria,
  getSubcategoria
} from '../controllers/catalog.controller.js';

const router = Router();

router.get('/categorias', listCategorias);
router.get('/categorias/:id', getCategoria);
router.get('/subcategorias/:categoriaId/:id', getSubcategoria);

export default router;
