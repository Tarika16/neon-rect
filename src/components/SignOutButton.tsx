"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ className = "btn btn-outline btn-sm" }: { className?: string }) {
    return (
        <button onClick={() => signOut({ callbackUrl: "/" })} className={className}>
            <LogOut size={14} /> Sign Out
        </button>
    );
}
