import { Router } from 'express';
import {
  listCategorias,
  getCategoria,
  getSubcategoria,
  getFamilia,
  listProductos,
} from '../controllers/catalog.controller.js';

const router = Router();

router.get('/categorias', listCategorias);
router.get('/categorias/:id', getCategoria);
router.get('/subcategorias/:categoriaId/:id', getSubcategoria);
router.get('/familias/:categoriaId/:subcategoriaId/:id', getFamilia);
router.get('/productos/:categoriaId/:subcategoriaId/:familiaId', listProductos);

export default router;
