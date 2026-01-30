import { pool } from "../config/db.js";

export async function getCategorias() {
  const { rows } = await pool.query(
    `SELECT id, nombre, abbreviation
     FROM categoria
     ORDER BY nombre`,
  );
  return rows;
}

export async function getCategoriaTree(id) {
  const { rows: categorias } = await pool.query(
    `SELECT id, nombre, abbreviation
     FROM categoria
     WHERE id = $1`,
    [id],
  );

  const categoria = categorias[0];
  if (!categoria) return null;

  const { rows: subfamilias } = await pool.query(
    `
    SELECT
      sc.id          AS subcategoria_id,
      sc.nombre      AS subcategoria_nombre,
      sc.abbreviation AS subcategoria_abbreviation,
      f.id           AS familia_id,
      f.nombre       AS familia_nombre,
      f.abbreviation AS familia_abbreviation
    FROM subcategoria sc
    LEFT JOIN familia f ON f.subcategoria_id = sc.id
    WHERE sc.categoria_id = $1
    ORDER BY sc.nombre, f.nombre
    `,
    [id],
  );

  const subcategoriasMap = new Map();

  for (const row of subfamilias) {
    let sub = subcategoriasMap.get(row.subcategoria_id);
    if (!sub) {
      sub = {
        id: row.subcategoria_id,
        nombre: row.subcategoria_nombre,
        abbreviation: row.subcategoria_abbreviation,
        familias: [],
      };
      subcategoriasMap.set(row.subcategoria_id, sub);
    }

    if (row.familia_id) {
      sub.familias.push({
        id: row.familia_id,
        nombre: row.familia_nombre,
        abbreviation: row.familia_abbreviation,
      });
    }
  }

  return {
    ...categoria,
    subcategorias: Array.from(subcategoriasMap.values()),
  };
}

export async function getSubcategoriaById(categoriaId, id) {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.nombre,
      s.abbreviation,
      c.id     AS categoria_id,
      c.nombre AS categoria_nombre
    FROM subcategoria s
    JOIN categoria c
      ON c.id = s.categoria_id
    WHERE s.id = $1
      AND s.categoria_id = $2
    `,
    [id, categoriaId]
  );

  return rows[0] || null;
}

