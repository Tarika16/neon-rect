import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Truly lazy Prisma Client
// This prevents the constructor from running during Next.js static analysis/build
export const prisma = new Proxy({} as PrismaClient, {
    get(target, prop, receiver) {
        if (prop === "toJSON") return () => "PrismaClient";

        if (!globalForPrisma.prisma) {
            // Only instantiate when first accessed
            globalForPrisma.prisma = new PrismaClient();
        }

        const value = (globalForPrisma.prisma as any)[prop];
        return typeof value === "function" ? value.bind(globalForPrisma.prisma) : value;
    },
});
