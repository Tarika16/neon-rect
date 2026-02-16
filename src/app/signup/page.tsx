"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setSuccess(data.message);
            setTimeout(() => router.push("/login"), 2000);
        } catch {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center">
            <div
                className="glow-bg"
                style={{ top: "20%", right: "10%", background: "#6c63ff" }}
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
                            <UserPlus size={22} color="#6c63ff" />
                        </div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                            Create Account
                        </h1>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.25rem",
                            }}
                        >
                            Sign up to request dashboard access
                        </p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}
                    {success && <div className="success-msg">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "1rem" }}>
                            <label className="label">Full Name</label>
                            <div style={{ position: "relative" }}>
                                <User
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
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

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
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                            disabled={loading}
                        >
                            {loading ? <span className="spinner" /> : "Create Account"}
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
                        Already have an account?{" "}
                        <Link href="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
