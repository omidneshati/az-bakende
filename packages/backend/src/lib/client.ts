import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import cors from "@elysiajs/cors";

export const prisma = new PrismaClient();

export const client = new Elysia().use(cors());
