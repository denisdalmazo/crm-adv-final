import "./globals.css";
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, Calendar, DollarSign, LogOut, Gavel } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex h-screen overflow-hidden antialiased">
        {/* SIDEBAR ESTILO POTENCIE */}
        <aside className="w-72 bg-black border-r border-white/5 flex flex-col shrink-0">
          <div className="p-8 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Gavel className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-black tracking-tighter text-white uppercase">Dalmazo<span className="text-blue-500 font-light">Adv</span></h2>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <NavItem href="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
            <NavItem href="/clientes" icon={<Users size={20}/>} label="Leads & Clientes" />
            <NavItem href="/processos" icon={<Briefcase size={20}/>} label="Pipeline" />
            <NavItem href="/prazos" icon={<Calendar size={20}/>} label="Relatórios" />
            <NavItem href="/financeiro" icon={<DollarSign size={20}/>} label="Configurações" />
          </nav>

          <div className="p-6 border-t border-white/5">
            <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest w-full">
              <LogOut size={18}/> Sair do Sistema
            </button>
          </div>
        </aside>

        {/* ÁREA CENTRAL */}
        <main className="flex-1 overflow-y-auto p-12 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all group no-underline">
      <span className="group-hover:text-blue-500 transition-colors">{icon}</span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </Link>
  );
}
