export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tight">Bem-vindo, Denis 👋</h1>
        <p className="text-slate-500 font-medium">Visão geral do escritório • Atualizando em tempo real</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Leads Totais" value="4" color="blue" />
        <StatCard title="Clientes Quentes" value="2" color="orange" />
        <StatCard title="Em Andamento" value="13" color="white" />
        <StatCard title="Fechados este mês" value="0" color="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] h-[400px]">
          <h3 className="text-lg font-bold text-white mb-2">Leads por Área Jurídica</h3>
          <div className="w-full h-px bg-white/5 mb-6" />
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] h-[400px]">
          <h3 className="text-lg font-bold text-white mb-2">Score Médio dos Leads</h3>
          <div className="w-full h-px bg-white/5 mb-6" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    green: 'text-emerald-500',
    white: 'text-white'
  };
  return (
    <div className="glass-card p-8 rounded-[2.5rem]">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{title}</p>
      <p className={`text-5xl font-black ${colors[color]}`}>{value}</p>
    </div>
  );
}
