import { Router } from 'express';

import { listCategorias, getCategoria } from '../controllers/categorias.controller.js';
import { listSubcategorias, getSubcategoria } from '../controllers/subcategorias.controller.js';
import { listFamilias, getFamilia } from '../controllers/familias.controller.js';
import { listProductos, getProducto } from '../controllers/productos.controller.js';
import { logPresence, listPresence } from '../controllers/presence.controller.js';

const router = Router();

/* Categorías */
router.get('/categorias', listCategorias);
router.get('/categorias/:id', getCategoria);
/* Subcategorías */
router.get('/categorias/:categoriaId/subcategorias', listSubcategorias);
router.get('/categorias/:categoriaId/subcategorias/:id', getSubcategoria);
/* Familias */
router.get('/categorias/:categoriaId/subcategorias/:subcategoriaId/familias', listFamilias);
router.get('/categorias/:categoriaId/subcategorias/:subcategoriaId/familias/:id',getFamilia);
/* Productos */
router.get('/categorias/:categoriaId/subcategorias/:subcategoriaId/familias/:familiaId/productos',listProductos);
router.get('/categorias/:categoriaId/subcategorias/:subcategoriaId/familias/:familiaId/productos/:id',getProducto);
/* Presence */
router.post('/presence', logPresence);
router.get('/presence', listPresence);

export default router;
