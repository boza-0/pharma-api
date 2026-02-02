import { pool } from '../config/db.js';

export async function listCategorias() {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation
    FROM categoria
    ORDER BY nombre
    `
  );

  return rows;
}

export async function getCategoriaById(id) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nombre,
      abbreviation
    FROM categoria
    WHERE id = $1
    `,
    [id]
  );

  return rows[0] || null;
}
