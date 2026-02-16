import { PrismaClient } from "@prisma/client";
import "dotenv/config";

async function main() {
    // Testing the NON-POOLED URL
    const url = "postgresql://neondb_owner:npg_FL8iMXHc0ZPa@ep-blue-math-aiqxpafj.us-east-1.aws.neon.tech/neondb?sslmode=require";
    console.log("Testing NON-POOLED URL...");

    const prisma = new PrismaClient({
        datasources: {
            db: { url }
        }
    } as any);

    try {
        await prisma.$connect();
        console.log("SUCCESS!");
        await prisma.$disconnect();
    } catch (err: any) {
        console.error("FAILED:", err.message);
    }
}
main();
