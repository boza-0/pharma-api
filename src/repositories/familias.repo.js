import { pool } from '../config/db.js';

export async function listFamiliasBySubcategoria(categoriaId, subcategoriaId) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation
    FROM familia
    WHERE categoria_id = $1
      AND subcategoria_id = $2
    ORDER BY nombre
    `,
    [categoriaId, subcategoriaId]
  );

  return rows;
}

export async function getFamiliaById(categoriaId, subcategoriaId, id) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation,
      categoria_id,
      subcategoria_id
    FROM familia
    WHERE id = $1
      AND subcategoria_id = $2
      AND categoria_id = $3
    `,
    [id, subcategoriaId, categoriaId]
  );

  return rows[0] || null;
}
