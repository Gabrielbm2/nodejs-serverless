import { pool } from "../database/connection";

export async function create(data: any) {
  const result = await pool.query(
    "INSERT INTO files (originalname, mimetype, url, size) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.originalname, data.mimetype, data.url, data.size]
  );
  return result.rows[0];
}

export async function list() {
  const result = await pool.query("SELECT * FROM files");
  return result.rows;
}

export async function findAll(params: any) {
  const limit = parseInt(params.limit) || 10;
  const offset = parseInt(params.offset) || 0;
  const result = await pool.query("SELECT * FROM files LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
  return { data: result.rows, limit, offset };
}

export async function findOne(id: string) {
  const result = await pool.query("SELECT * FROM files WHERE id = $1", [id]);
  if (result.rows.length === 0) throw new Error("File not found");
  return result.rows[0];
}

export async function update(id: string, data: any) {
  const result = await pool.query(
    "UPDATE files SET originalname=$1, mimetype=$2, url=$3, size=$4 WHERE id=$5 RETURNING *",
    [data.originalname, data.mimetype, data.url, data.size, id]
  );
  return result.rows[0];
}

export async function remove(id: string) {
  const result = await pool.query(
    "DELETE FROM files WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}
