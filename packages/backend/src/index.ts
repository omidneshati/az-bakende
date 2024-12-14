import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

const saveData = async (data: any) => {
  console.log(data);
};

const app = new Elysia()
  .use(cors())
  .post(
    "/",
    ({ body }) => {
      saveData(body);
      return { message: "Data saved" };
    },
    {
      response: t.Object({
        message: t.String(),
      }),
      body: t.Object({
        data: t.String(),
      }),
    }
  )
  .listen(3000);

export type App = typeof app;
