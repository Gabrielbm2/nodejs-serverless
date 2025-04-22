import { createFilesTable } from "./database/migrations/createFilesTable";

createFilesTable()
  .then(() => {
    console.log("✅ Tabela criada com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erro ao criar tabela:", err);
    process.exit(1);
  });
