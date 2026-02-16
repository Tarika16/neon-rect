import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export default async function PendingApprovalPage() {
    const session = await auth();

    if (!session?.user) redirect("/login");
    if ((session.user as any).isApproved) redirect("/dashboard");

    return (
        <div className="page-center">
            <div
                className="glow-bg"
                style={{ top: "30%", left: "40%", background: "#f59e0b" }}
            />
            <div style={{ textAlign: "center", maxWidth: 480, position: "relative", zIndex: 1 }}>
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 18,
                        background: "rgba(245,158,11,0.12)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.25rem",
                    }}
                >
                    <Clock size={32} color="#f59e0b" />
                </div>

                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Awaiting Approval
                </h1>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        marginBottom: "2rem",
                    }}
                >
                    Your account has been created successfully. An administrator needs to
                    approve your access before you can use the dashboard. You&apos;ll be
                    able to sign in once approved.
                </p>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                    <Link href="/" className="btn btn-outline">
                        <ArrowLeft size={16} /> Back Home
                    </Link>
                    <SignOutButton />
                </div>
            </div>
        </div>
    );
}
