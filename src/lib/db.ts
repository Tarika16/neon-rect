import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Standard Singleton for Prisma v6
const prismaClientSingleton = () => {
    try {
        return new PrismaClient();
    } catch (e) {
        console.error("Failed to initialize PrismaClient:", e);
        return undefined; // Allow build to pass if DB is unreachable
    }
};

export const prisma = globalForPrisma.prisma ?? (prismaClientSingleton() as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
