import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";
import createUser from "./lib/db/createUser";
// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

const prisma = new PrismaClient();

const saveData = async (data: any) => {
  const newUser = await createUser(prisma, data);
  console.log(newUser);
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
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
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get(
    "/",
    async () => {
      const users = await getUsers();
      return {
        users: users.map((user) => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        })),
      };
    },
    {
      response: t.Object({
        users: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            email: t.String(),
          })
        ),
      }),
    }
  )
  .listen(3000);

export type App = typeof app;
