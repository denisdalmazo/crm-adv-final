"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layout, Users, Scale, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Conexão Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase.from('leads').select('*');
      if (!error) setLeads(data || []);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DALMAZO | CRM JURÍDICO</h1>
          <p className="text-slate-400">Gestão Ativa de Leads e Processos</p>
        </div>
        <div className="bg-blue-600 px-4 py-2 rounded-lg font-medium">Dashboard Ativo</div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Users size={20}/>} label="Total Leads" value={leads.length} color="blue" />
        <StatCard icon={<Scale size={20}/>} label="Em Triagem" value="12" color="yellow" />
        <StatCard icon={<Clock size={20}/>} label="Aguardando" value="5" color="purple" />
        <StatCard icon={<CheckCircle size={20}/>} label="Convertidos" value="8" color="green" />
      </main>

      <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-xl font-semibold text-white">Leads Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                <th className="p-4">Nome</th>
                <th className="p-4">Caso</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Carregando dados do Supabase...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Nenhum lead encontrado. Conecte seu Supabase!</td></tr>
              ) : (
                leads.map((lead, i) => (
                  <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium">{lead.nome || 'Cliente Exemplo'}</td>
                    <td className="p-4 text-slate-300">{lead.tipo_acao || 'Cível'}</td>
                    <td className="p-4"><span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">Novo</span></td>
                    <td className="p-4 text-slate-400">21/04/2026</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400'
  };
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className={`${colors[color]} mb-4`}>{icon}</div>
      <div className="text-slate-400 text-sm mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
