"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  userInitials: string;
}

export default function AppLayout({ children, userInitials }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grain min-h-screen bg-[#080808]">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-800/[0.04] blur-[130px]" />
      </div>

      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} userInitials={userInitials} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative z-10 pt-16 md:pl-64">
        <div className="p-5 md:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
