"use client";

import { logout } from "@/actions/auth";
import { useTransition } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
  userInitials: string;
}

export default function Header({ onToggleSidebar, userInitials }: HeaderProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="scan-line fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between bg-surface/70 px-5 backdrop-blur-2xl md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-lighter hover:text-text-bright md:hidden"
          aria-label="Ouvrir le menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div className="pulse-glow flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-700">
            <span className="font-display text-xs font-bold text-white">S</span>
          </div>
          <h1 className="glow-text font-display text-lg font-bold tracking-tight text-primary">
            SoloCRM
          </h1>
        </div>
      </div>

      {/* User area */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="rounded-lg px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted transition-colors hover:bg-surface-lighter hover:text-text-bright disabled:opacity-40"
        >
          {isPending ? "..." : "Deconnexion"}
        </button>
        <div className="group relative">
          <div className="absolute -inset-1 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-emerald-700 ring-1 ring-primary/20">
            <span className="font-mono text-[10px] font-bold text-white">{userInitials}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
