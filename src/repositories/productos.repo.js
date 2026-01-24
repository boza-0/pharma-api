import { pool } from '../config/db.js';

export async function searchProductos(filters) {
  const conditions = [];
  const values = [];
  let idx = 1;

  if (filters.q) {
    values.push(`%${filters.q}%`);
    conditions.push(`
      (
        p.nombre ILIKE $${idx} OR
        p.principio_activo ILIKE $${idx} OR
        p.concentracion ILIKE $${idx} OR
        p.forma_farmaceutica ILIKE $${idx} OR
        p.marca ILIKE $${idx} OR
        c.nombre ILIKE $${idx} OR
        sc.nombre ILIKE $${idx} OR
        f.nombre ILIKE $${idx} OR
        v.nombre ILIKE $${idx}
      )
    `);
    idx++;
  }

  if (filters.categoriaId) {
    const categoriaId = Number(filters.categoriaId);
    if (!Number.isInteger(categoriaId)) {
      return [];
    }
    values.push(categoriaId);
    conditions.push(`p.categoria_id = $${idx++}`);
  }

  if (filters.subcategoriaId) {
    const subcategoriaId = Number(filters.subcategoriaId);
    if (!Number.isInteger(subcategoriaId)) {
      return [];
    }
    values.push(subcategoriaId);
    conditions.push(`p.subcategoria_id = $${idx++}`);
  }

  if (filters.familiaId) {
    const familiaId = Number(filters.familiaId);
    if (!Number.isInteger(familiaId)) {
      return [];
    }
    values.push(familiaId);
    conditions.push(`p.familia_id = $${idx++}`);
  }

  if (filters.inStock === true) {
    conditions.push(`p.stock > 0`);
  }

  const where = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const query = `
    SELECT
      p.id,
      p.sku,
      p.nombre,
      p.marca,
      p.principio_activo,
      p.concentracion,
      p.forma_farmaceutica,
      p.pvp,
      p.stock,
      c.nombre  AS categoria,
      sc.nombre AS subcategoria,
      f.nombre  AS familia,
      v.nombre  AS via_administracion
    FROM productos p
    JOIN categoria c
      ON c.id = p.categoria_id
    JOIN subcategoria sc
      ON sc.id = p.subcategoria_id
     AND sc.categoria_id = p.categoria_id
    JOIN familia f
      ON f.id = p.familia_id
     AND f.subcategoria_id = p.subcategoria_id
     AND f.categoria_id = p.categoria_id
    JOIN via_administracion v
      ON v.id = p.via_administracion_id
    ${where}
    ORDER BY p.nombre, p.id
  `;

  const { rows } = await pool.query(query, values);
  return rows;
}
