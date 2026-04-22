import "./globals.css";
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, Calendar, DollarSign, LogOut } from "lucide-react";

export const metadata = {
  title: "Dalmazo & Co | CRM Jurídico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-900 text-slate-100 flex h-screen overflow-hidden">
        
        {/* SIDEBAR PROFISSIONAL */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-4 shrink-0">
          <div className="mb-10 px-4 py-2">
            <h2 className="text-xl font-black text-blue-500 italic tracking-tighter">DALMAZO & CO</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Consultoria Jurídica</p>
          </div>

          <nav className="flex-1 space-y-2">
            <MenuLink href="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
            <MenuLink href="/clientes" icon={<Users size={20}/>} label="Clientes & Leads" />
            <MenuLink href="/processos" icon={<Briefcase size={20}/>} label="Processos" />
            <MenuLink href="/prazos" icon={<Calendar size={20}/>} label="Prazos & Agenda" />
            <MenuLink href="/financeiro" icon={<DollarSign size={20}/>} label="Financeiro" />
          </nav>

          <div className="pt-4 border-t border-slate-800">
            <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 p-3 w-full transition-all group font-bold text-sm">
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform"/> Sair
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </body>
    </html>
  );
}

// Componente auxiliar para os links não bugarem
function MenuLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-blue-600/10 hover:text-blue-400 transition-all font-semibold text-sm no-underline decoration-transparent">
      {icon}
      <span>{label}</span>
    </Link>
  );
}