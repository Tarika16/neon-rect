"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center">
            <div
                className="glow-bg"
                style={{ top: "30%", left: "5%", background: "#22c55e" }}
            />
            <div className="auth-container" style={{ position: "relative", zIndex: 1 }}>
                <div className="glass-card">
                    <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: "rgba(108,99,255,0.15)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "0.75rem",
                            }}
                        >
                            <LogIn size={22} color="#6c63ff" />
                        </div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Welcome Back</h1>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.25rem",
                            }}
                        >
                            Sign in to your dashboard
                        </p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "1rem" }}>
                            <label className="label">Email</label>
                            <div style={{ position: "relative" }}>
                                <Mail
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--text-muted)",
                                    }}
                                />
                                <input
                                    className="input-field"
                                    style={{ paddingLeft: "2.25rem" }}
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <label className="label">Password</label>
                            <div style={{ position: "relative" }}>
                                <Lock
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--text-muted)",
                                    }}
                                />
                                <input
                                    className="input-field"
                                    style={{ paddingLeft: "2.25rem" }}
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                            disabled={loading}
                        >
                            {loading ? <span className="spinner" /> : "Sign In"}
                        </button>
                    </form>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "1.25rem",
                            fontSize: "0.88rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Don&apos;t have an account?{" "}
                        <Link href="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
