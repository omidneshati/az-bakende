import { prisma } from "../client";

const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const newUser = await prisma.user.create({
    data,
  });

  return newUser;
};

const getUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};

export default createUser;
