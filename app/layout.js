import "./globals.css";
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, LogOut } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-900 text-slate-100 flex h-screen overflow-hidden font-sans">
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-4">
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold text-blue-400 italic">DALMAZO & CO</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Jurídico & Consultoria</p>
          </div>
          <nav className="flex-1 space-y-1">
            <MenuLink href="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
            <MenuLink href="/clientes" icon={<Users size={20}/>} label="Clientes & Leads" />
            <MenuLink href="/processos" icon={<Briefcase size={20}/>} label="Processos" />
            <MenuLink href="/prazos" icon={<Calendar size={20}/>} label="Prazos & Agenda" />
          </nav>
          <div className="pt-4 border-t border-slate-800">
            <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 p-3 w-full transition-all">
              <LogOut size={20}/> <span className="font-bold text-sm">Sair</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </body>
    </html>
  );
}

function MenuLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-semibold text-sm">
      {icon} {label}
    </Link>
  );
}