export default function Dashboard() {
  return (
    <div className="max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-black">Painel de Controle</h1>
        <p className="text-slate-500">Gestão Dalmazo & Co Intelligence</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] shadow-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Clientes</p>
          <p className="text-4xl font-black">48</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] shadow-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Processos</p>
          <p className="text-4xl font-black text-blue-500">12</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] shadow-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Prazos Hoje</p>
          <p className="text-4xl font-black text-orange-500">03</p>
        </div>
      </div>
    </div>
  );
}
