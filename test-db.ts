import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    try {
        console.log("Trying 'config' property");
        const prisma = new PrismaClient({
            config: {
                datasource: {
                    url: process.env.DATABASE_URL
                }
            }
        } as any);
        await prisma.$connect();
        console.log("SUCCESS with 'config' property");
        await prisma.$disconnect();
    } catch (e: any) {
        console.log(`Failed with 'config': ${e.message}`);
    }
}

main();
