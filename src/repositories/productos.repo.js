import { pool } from '../config/db.js';

export async function listProductosByFamilia(
  categoriaId,
  subcategoriaId,
  familiaId
) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      sku,
      nombre,
      marca,
      principio_activo,
      concentracion,
      forma_farmaceutica,
      pvp,
      stock
    FROM productos
    WHERE categoria_id = $1
      AND subcategoria_id = $2
      AND familia_id = $3
    ORDER BY nombre
    `,
    [categoriaId, subcategoriaId, familiaId]
  );

  return rows;
}

export async function getProductoById(
  categoriaId,
  subcategoriaId,
  familiaId,
  id
) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      sku,
      nombre,
      marca,
      principio_activo,
      concentracion,
      forma_farmaceutica,
      unidades_por_envase,
      comentarios,
      foto_url,
      sustancia_controlada,
      requiere_serializacion,
      pvp,
      stock,
      categoria_id,
      subcategoria_id,
      familia_id,
      via_administracion_id
    FROM productos
    WHERE id = $1
      AND categoria_id = $2
      AND subcategoria_id = $3
      AND familia_id = $4
    `,
    [id, categoriaId, subcategoriaId, familiaId]
  );

  return rows[0] || null;
}
