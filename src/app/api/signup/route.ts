import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({ message: "Signup API is ready" });
}

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // First user becomes an auto-approved admin
        const userCount = await prisma.user.count();
        const isFirstUser = userCount === 0;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: isFirstUser ? "ADMIN" : "USER",
                isApproved: isFirstUser,
            },
        });

        return NextResponse.json(
            {
                message: isFirstUser
                    ? "Admin account created successfully!"
                    : "Account created! Please wait for admin approval.",
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
