import { pool } from '../config/db.js';

export async function insertPresence(userId, url) {
  await pool.query(
    `
    INSERT INTO user_presence_log (user_id, url)
    VALUES ($1, $2)
    `,
    [userId, url]
  );
}

export async function listPresence(limit) {
  const { rows } = await pool.query(
    `
    SELECT
      user_id,
      url,
      timestamp
    FROM user_presence_log
    ORDER BY timestamp DESC
    LIMIT $1
    `,
    [limit]
  );

  return rows;
}
