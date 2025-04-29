import express from "express";
import serverlessExpress from "@vendia/serverless-express";
import routes from "./routes";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(routes);

export const handler = serverlessExpress({ app });
