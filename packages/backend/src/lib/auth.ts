import { client, prisma } from "./client";
import Elysia, { error, t } from "elysia";
import createUser from "./db/user";
import { Prisma } from "@prisma/client";
import { PrismaErrorHandler } from "./db/PrismaErrorHandler";

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
          return PrismaErrorHandler(err);
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
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: body.email,
            },
          });

          return { message: "Login Successful" };
        } catch (err) {
          return PrismaErrorHandler(err);
        }
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
