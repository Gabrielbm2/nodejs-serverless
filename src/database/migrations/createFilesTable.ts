import { pool } from "../connection";

export async function createFilesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS files (
      id SERIAL PRIMARY KEY,
      originalname VARCHAR(255),
      mimetype VARCHAR(255),
      url TEXT,
      size INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Tabela files criada com sucesso.");
}
