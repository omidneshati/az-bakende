import { PrismaClient } from "@prisma/client";

const createUser = async (
  prisma: PrismaClient,
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const newUser = await prisma.user.create({
    data,
  });

  return newUser;
};

export default createUser;
