"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Dados fictícios para o gráfico enquanto o banco cresce
const dataGrafico = [
  { name: 'Jan', clientes: 4 },
  { name: 'Fev', clientes: 7 },
  { name: 'Mar', clientes: 5 },
  { name: 'Abr', clientes: 12 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, triagem: 0, convertidos: 0 });

  useEffect(() => {
    async function getStats() {
      const { data } = await supabase.from('leads').select('status');
      if (data) {
        setStats({
          total: data.length,
          triagem: data.filter(l => l.status === 'Triagem').length,
          convertidos: data.filter(l => l.status === 'Convertido').length
        });
      }
    }
    getStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* TÍTULO DA PÁGINA */}
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-500 text-sm">Visão geral da sua operação jurídica hoje.</p>
      </div>

      {/* CARDS DE IMPACTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashCard label="Total de Leads" value={stats.total} icon={<Users className="text-blue-400"/>} trend="+12%" />
        <DashCard label="Em Triagem" value={stats.triagem} icon={<TrendingUp className="text-yellow-400"/>} trend="+5%" />
        <DashCard label="Contratos Fechados" value={stats.convertidos} icon={<Calendar className="text-green-400"/>} trend="+2%" />
      </div>

      {/* ÁREA DO GRÁFICO */}
      <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500"/> Crescimento de Clientes
          </h3>
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs outline-none">
            <option>Últimos 6 meses</option>
            <option>Este ano</option>
          </select>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataGrafico}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="clientes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTÃO RÁPIDO PARA IR PARA CLIENTES */}
      <div className="flex justify-end">
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-slate-700 transition-all">
          Ver Tabela de Clientes <ArrowUpRight size={18}/>
        </button>
      </div>
    </div>
  );
}

function DashCard({ label, value, icon, trend }) {
  return (
    <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-3xl hover:border-slate-600 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
      <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</div>
      <div className="text-4xl font-black text-white">{value}</div>
    </div>
  );
}
