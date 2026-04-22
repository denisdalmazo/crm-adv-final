import "./globals.css";
import Link from 'next/link'; // <--- ESSA LINHA É A QUE FALTA!
import { LayoutDashboard, Users, Briefcase, Calendar, DollarSign, LogOut } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex h-screen bg-[#020617] text-white overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-black border-r border-white/10 flex flex-col p-6 shrink-0">
          <div className="mb-10 text-xl font-black italic tracking-tighter">
            DALMAZO<span className="text-blue-500">&CO</span>
          </div>
          
          <nav className="flex-1 space-y-2 text-sm font-bold">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all no-underline">
              <LayoutDashboard size={20}/> Dashboard
            </Link>
            <Link href="/clientes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all no-underline">
              <Users size={20}/> Clientes
            </Link>
            <Link href="/processos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all no-underline">
              <Briefcase size={20}/> Processos
            </Link>
            <Link href="/prazos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all no-underline">
              <Calendar size={20}/> Prazos
            </Link>
            <Link href="/financeiro" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all no-underline">
              <DollarSign size={20}/> Financeiro
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 p-3 w-full transition-all font-bold text-sm">
              <LogOut size={18}/> Sair
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO COM GRADIENTE */}
        <main className="flex-1 overflow-y-auto p-10 relative bg-[#020617]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
