import "./globals.css";
import { LayoutDashboard, Users, Briefcase, Settings, LogOut, Bell } from "lucide-react";

export const metadata = {
  title: "Dalmazo | CRM Jurídico",
  description: "Gestão profissional de advocacia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-900 text-slate-100 flex h-screen overflow-hidden font-sans">
        
        {/* SIDEBAR - MENU LATERAL */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col hidden md:flex">
          <div className="p-6 mb-4">
            <h2 className="text-xl font-black text-blue-400 tracking-tighter italic">DALMAZO & CO</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Consultoria Jurídica</p>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <div className="text-[10px] font-black text-slate-600 uppercase px-4 mb-2 tracking-widest">Menu Principal</div>
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
            <NavItem icon={<Users size={20}/>} label="Leads e Clientes" />
            <NavItem icon={<Briefcase size={20}/>} label="Processos" />
            
            <div className="text-[10px] font-black text-slate-600 uppercase px-4 mt-6 mb-2 tracking-widest">Sistema</div>
            <NavItem icon={<Settings size={20}/>} label="Configurações" />
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-all w-full px-4 py-3 rounded-xl hover:bg-red-500/5 group">
              <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500"/>
              <span className="font-bold text-sm">Sair do Sistema</span>
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* HEADER SUPERIOR (BARRA DE BUSCA/NOTIFICAÇÕES) */}
          <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8 backdrop-blur-md">
            <div className="text-sm font-medium text-slate-400">
              Bem-vindo, <span className="text-blue-400 font-bold">Denis</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs shadow-lg shadow-blue-900/40">
                D
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' 
        : 'text-slate-500 hover:bg-slate-800 hover:text-slate-100'
    }`}>
      <span className={`${active ? 'text-white' : 'group-hover:text-blue-400'} transition-colors`}>
        {icon}
      </span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </div>
  );
}
