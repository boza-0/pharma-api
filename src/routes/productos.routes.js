import { Router } from 'express';
import { listProductos } from '../controllers/productos.controller.js';

const router = Router();

router.get('/', listProductos);
// later: router.get('/:id', ...), POST, PUT, PATCH, DELETE

export default router;
