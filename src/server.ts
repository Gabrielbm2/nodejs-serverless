import express from "express";
import routes from "./routes";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
