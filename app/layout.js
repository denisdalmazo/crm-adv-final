import "./globals.css";
import { LayoutDashboard, Users, Briefcase, Settings, LogOut } from "lucide-react";

export const metadata = {
  title: "Dalmazo | CRM Jurídico",
  description: "Gestão profissional de advocacia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-900 text-slate-100 flex h-screen overflow-hidden">
        {/* MENU LATERAL FIXO */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-400 tracking-tighter italic">DALMAZO & CO</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Legal Consulting</p>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
            <NavItem icon={<Users size={20}/>} label="Clientes / Leads" />
            <NavItem icon={<Briefcase size={20}/>} label="Processos" />
            <NavItem icon={<Settings size={20}/>} label="Configurações" />
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2">
              <LogOut size={20}/>
              <span className="font-medium text-sm">Sair</span>
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO */}
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );
}
