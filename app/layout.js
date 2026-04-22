import "./globals.css";
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, Calendar, DollarSign, LogOut, Settings } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex h-screen bg-[#09090b] text-white overflow-hidden">
        {/* SIDEBAR PRETA */}
        <aside className="w-64 bg-black border-r border-white/10 flex flex-col p-6 shrink-0">
          <div className="mb-10 text-xl font-black italic tracking-tighter">DALMAZO<span className="text-blue-500">&CO</span></div>
          <nav className="flex-1 space-y-2 text-sm font-bold">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all"><LayoutDashboard size={20}/> Dashboard</Link>
            <Link href="/clientes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all"><Users size={20}/> Clientes</Link>
            <Link href="/processos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all"><Briefcase size={20}/> Processos</Link>
          </nav>
        </aside>
        {/* ÁREA DE CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </body>
    </html>
  );
}
