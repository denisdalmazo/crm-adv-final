// app/layout.js
import "./globals.css";
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, Calendar, DollarSign, LogOut, User } from "lucide-react";

export const metadata = {
  title: "Dalmazo & Co | CRM Jurídico",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-950 text-slate-100 flex h-screen overflow-hidden font-sans">
        
        {/* SIDEBAR - Estilo Flowlu */}
        <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
          <div className="px-6 py-8 border-b border-slate-800">
            <h1 className="text-2xl font-black tracking-tighter text-white">
              DALMAZO <span className="text-blue-500">&amp;</span> CO
            </h1>
            <p className="text-xs text-slate-500 mt-1">Escritório de Advocacia</p>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1">
            <MenuLink href="/" icon={<LayoutDashboard size={22}/>} label="Dashboard" />
            <MenuLink href="/clientes" icon={<Users size={22}/>} label="Clientes & Leads" />
            <MenuLink href="/processos" icon={<Briefcase size={22}/>} label="Processos" />
            <MenuLink href="/prazos" icon={<Calendar size={22}/>} label="Prazos & Agenda" />
            <MenuLink href="/financeiro" icon={<DollarSign size={22}/>} label="Financeiro" />
          </nav>

          <div className="p-4 border-t border-slate-800 mt-auto">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                DA
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Dr. Denis Dalmazo</p>
                <p className="text-xs text-slate-500">Administrador Master</p>
              </div>
              <button className="text-slate-400 hover:text-red-400 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* HEADER */}
          <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center px-8 justify-between z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-white">Bem-vindo de volta, Denis</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-medium">Denis Dalmazo</p>
                <p className="text-xs text-emerald-400">Online • Master</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-md">
                DD
              </div>
            </div>
          </header>

          {/* CONTEÚDO DAS PÁGINAS */}
          <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function MenuLink({ href, icon, label }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-slate-300 hover:bg-slate-900 hover:text-white transition-all font-medium text-[15px] group"
    >
      <span className="text-slate-400 group-hover:text-blue-400 transition-colors">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}