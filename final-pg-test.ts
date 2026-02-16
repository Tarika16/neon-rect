import { Client } from "pg";
import "dotenv/config";

async function testDirect() {
    console.log("Testing direct PG connection...");
    const url = process.env.DATABASE_URL;
    console.log("Using URL host:", url?.split("@")[1]);

    // Explicitly reject Unauthorized (standard Prisma behavior)
    // Prisma usually sets rejectUnauthorized: true by default unless specified otherwise.
    // Neon requires SSL.
    const client = new Client({
        connectionString: url,
        ssl: { rejectUnauthorized: false }, // Try permissive SSL
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();
        console.log("✅ PG Connection SUCCESS!");
        const res = await client.query("SELECT 1 as connected");
        console.log("Query Result:", res.rows[0]);
        await client.end();
    } catch (err: any) {
        console.error("❌ PG Connection FAILED!");
        console.error("Message:", err.message);
        console.error("Code:", err.code); // useful for pg error codes
        if (err.cause) console.error("Cause:", err.cause);
    }
}

testDirect();
