import { Router } from 'express';
import { listCategorias, getCategoria } from '../controllers/catalog.controller.js';

const router = Router();

router.get('/categorias', listCategorias);
router.get('/categorias/:id', getCategoria);

export default router;
