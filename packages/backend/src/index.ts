import Elysia from "elysia";
import { auth } from "./lib/auth";
import cors from "@elysiajs/cors";

export const app = new Elysia()
  .use(cors())
  .group("v1", (app) => app.use(auth))
  .listen(3000);

export type App = typeof app;
