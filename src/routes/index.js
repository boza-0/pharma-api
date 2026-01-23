import { Router } from 'express';
import catalogRoutes from './catalog.routes.js';
import productosRoutes from './productos.routes.js';

export const router = Router();

router.use('/catalog', catalogRoutes);
router.use('/productos', productosRoutes);
