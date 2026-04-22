"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, Calendar, TrendingUp } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const dataMock = [{ name: 'Jan', processos: 2 }, { name: 'Fev', processos: 5 }, { name: 'Mar', processos: 8 }, { name: 'Abr', processos: 15 }];

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, processos: 0, prazos: 0 });

  useEffect(() => {
    async function load() {
      const { data: leads } = await supabase.from('leads').select('*');
      setStats({ leads: leads?.length || 0, processos: 12, prazos: 4 }); // Processos/Prazos em breve do banco
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
        <p className="text-slate-500">Gestão de processos e prazos fatais.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Clientes Ativos" value={stats.leads} color="text-blue-400" />
        <Card label="Processos em Andamento" value={stats.processos} color="text-purple-400" />
        <Card label="Prazos para esta semana" value={stats.prazos} color="text-red-400" />
      </div>

      <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-800 h-[350px]">
        <h3 className="mb-6 font-bold flex items-center gap-2"><TrendingUp size={20}/> Entrada de Novos Casos</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMock}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: 'none'}}/>
            <Area type="monotone" dataKey="processos" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ label, value, color }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
      <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">{label}</p>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}