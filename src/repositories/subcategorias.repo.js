import { pool } from '../config/db.js';

export async function listSubcategoriasByCategoria(categoriaId) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation
    FROM subcategoria
    WHERE categoria_id = $1
    ORDER BY nombre
    `,
    [categoriaId]
  );

  return rows;
}

export async function getSubcategoriaById(categoriaId, id) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation,
      categoria_id
    FROM subcategoria
    WHERE id = $1
      AND categoria_id = $2
    `,
    [id, categoriaId]
  );

  return rows[0] || null;
}
