import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool(env.db);
