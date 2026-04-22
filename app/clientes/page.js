"use client";
export default function Dashboard() {
  return (
    <div className="fade-up space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Painel de Controle</h1>
          <p className="text-slate-500 font-medium">Bem-vindo de volta ao Dalmazo & Co.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-blue-500">Status do Servidor</p>
          <div className="flex items-center gap-2 justify-end">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-white">Sincronizado com Supabase</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Clientes" value="48" color="blue" />
        <StatCard title="Prazos 7 dias" value="12" color="orange" />
        <StatCard title="Honorários" value="R$ 15.400" color="green" />
        <StatCard title="Processos" value="34" color="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2rem]">
          <h3 className="text-lg font-bold mb-6">Atividade Recente</h3>
          <div className="space-y-4">
             {/* Simulação de lista */}
             {[1,2,3].map(i => (
               <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0">
                 <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 font-bold">D</div>
                 <div>
                   <p className="text-sm font-bold">Novo lead registrado</p>
                   <p className="text-[10px] text-slate-500 uppercase">Há 15 minutos</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="glass-card p-6 rounded-[2rem] hover:scale-105 transition-transform cursor-pointer group">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{title}</p>
      <p className="text-2xl font-black text-white group-hover:text-blue-500 transition-colors">{value}</p>
    </div>
  );
}