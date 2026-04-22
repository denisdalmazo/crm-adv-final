// app/page.js  (Dashboard)
"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, TrendingUp, Calendar, DollarSign, ArrowUpRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const dataGrafico = [
  { name: 'Jan', clientes: 4, processos: 2 },
  { name: 'Fev', clientes: 7, processos: 5 },
  { name: 'Mar', clientes: 5, processos: 4 },
  { name: 'Abr', clientes: 12, processos: 9 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ totalLeads: 0, triagem: 0, convertidos: 0, totalProcessos: 0 });

  useEffect(() => {
    async function getStats() {
      const { data: leads } = await supabase.from('leads').select('status');
      const { data: processos } = await supabase.from('processos').select('*');

      setStats({
        totalLeads: leads?.length || 0,
        triagem: leads?.filter(l => l.status === 'Triagem').length || 0,
        convertidos: leads?.filter(l => l.status === 'Convertido').length || 0,
        totalProcessos: processos?.length || 0,
      });
    }
    getStats();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter">Dashboard</h1>
        <p className="text-slate-400 mt-1">Visão geral do escritório • Hoje é {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* CARDS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashCard label="Total de Leads" value={stats.totalLeads} icon={<Users className="text-blue-400"/>} trend="+18%" color="blue" />
        <DashCard label="Em Triagem" value={stats.triagem} icon={<Clock className="text-amber-400"/>} trend="+3%" color="amber" />
        <DashCard label="Contratos Fechados" value={stats.convertidos} icon={<TrendingUp className="text-emerald-400"/>} trend="+12%" color="emerald" />
        <DashCard label="Processos Ativos" value={stats.totalProcessos} icon={<Briefcase className="text-purple-400"/>} trend="+7%" color="purple" />
      </div>

      {/* GRÁFICO + RESUMO FINANCEIRO */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <TrendingUp className="text-blue-500" /> Crescimento do Escritório
            </h3>
            <select className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm">
              <option>Últimos 6 meses</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataGrafico}>
                <defs>
                  <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2937" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Area type="natural" dataKey="clientes" stroke="#3b82f6" strokeWidth={4} fill="url(#colorClientes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl h-full flex flex-col">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="text-emerald-400" /> Resumo Financeiro Rápido
            </h3>
            {/* Você pode puxar os dados reais do financeiro aqui depois */}
            <div className="space-y-6 mt-auto">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Recebido este mês</span>
                <span className="text-2xl font-bold text-emerald-400">R$ 48.750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">A receber</span>
                <span className="text-2xl font-bold text-orange-400">R$ 27.300</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/clientes" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all shadow-lg">
          Ver todos os Clientes <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}

function DashCard({ label, value, icon, trend, color }) {
  const colors = {
    blue: "text-blue-400 border-blue-500/20",
    amber: "text-amber-400 border-amber-500/20",
    emerald: "text-emerald-400 border-emerald-500/20",
    purple: "text-purple-400 border-purple-500/20"
  };

  return (
    <div className={`bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-slate-600 transition-all group`}>
      <div className="flex justify-between">
        <div className={`p-4 bg-slate-900 rounded-2xl ${colors[color]}`}>{icon}</div>
        <span className="text-emerald-400 text-sm font-bold">{trend}</span>
      </div>
      <div className="mt-8">
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-5xl font-black text-white mt-2 tracking-tighter">{value}</p>
      </div>
    </div>
  );
}