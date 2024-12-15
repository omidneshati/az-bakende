import { client, prisma } from "./client";
import Elysia, { error, t } from "elysia";
import createUser from "./db/user";

export const auth = new Elysia().group("/auth", (context) =>
  context
    .post(
      "/register",
      async ({ body }) => {
        try {
          const user = await prisma.user.create({
            data: body,
          });
          createUser(user);
          return { message: "Register successful" };
        } catch (err) {
          console.error(err);
          return error(401, { error: "User Email not Valid" });
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
          name: t.String(),
        }),
        response: {
          200: t.Object({
            message: t.String(),
          }),
          401: t.Object({
            error: t.String(),
          }),
        },
      }
    )
    .post(
      "/login",
      async ({ body }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!user) {
          error(404, "User not found");
        }

        if (user?.password !== body.password) {
          error(403, "Invalid password");
        }

        return { message: "Login Successful" };
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        response: {
          200: t.Object({
            message: t.String(),
          }),
          400: t.Object({
            error: t.String(),
          }),
        },
      }
    )
);
