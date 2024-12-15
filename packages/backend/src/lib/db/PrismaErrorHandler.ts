import { Prisma } from "@prisma/client";

type PrismaErrorResponse = {
  status: number;
  message: string;
};

export const PrismaErrorHandler = (error: unknown): PrismaErrorResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        return {
          status: 409,
          message: "Duplicate entry: A unique constraint failed.",
        };

      case "P2003": // Foreign key constraint failed
        return { status: 400, message: "Foreign key constraint failed." };

      case "P2025": // Record not found
        return { status: 404, message: "Record not found." };

      default:
        return { status: 500, message: "A database error occurred." };
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return { status: 400, message: "Validation error: Invalid input data." };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message || "An unexpected error occurred.",
    };
  }

  return { status: 500, message: "An unexpected error occurred." };
};
