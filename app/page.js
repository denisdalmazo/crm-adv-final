"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Scale, Clock, CheckCircle, Plus, X, Phone, FileText } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoAcao, setTipoAcao] = useState('');
  const [descricao, setDescricao] = useState('');

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('leads')
      .insert([{ nome, telefone, tipo_acao: tipoAcao, descricao }]);

    if (!error) {
      setNome(''); setTelefone(''); setTipoAcao(''); setDescricao('');
      setIsModalOpen(false);
      fetchLeads(); // Atualiza a lista automaticamente
    } else {
      alert("Erro ao salvar: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-400">DALMAZO | CRM</h1>
          <p className="text-slate-400 text-sm">Gestão Jurídica Ativa v2.0</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} /> Novo Lead
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={20}/>} label="Total Leads" value={leads.length} color="blue" />
        <StatCard icon={<Scale size={20}/>} label="Em Triagem" value="--" color="yellow" />
        <StatCard icon={<Clock size={20}/>} label="Aguardando" value="--" color="purple" />
        <StatCard icon={<CheckCircle size={20}/>} label="Convertidos" value="--" color="green" />
      </main>

      {/* Tabela de Leads */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-xl font-semibold">Leads Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Nome</th>
                <th className="p-4 font-bold">Telefone</th>
                <th className="p-4 font-bold">Tipo de Ação</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan="4" className="p-12 text-center text-slate-500 animate-pulse">Carregando dados...</td></tr>
              ) : leads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-medium text-blue-100">{lead.nome}</td>
                  <td className="p-4 text-slate-400">{lead.telefone || '(00) 00000-0000'}</td>
                  <td className="p-4"><span className="text-slate-300 bg-slate-700 px-2 py-1 rounded text-xs">{lead.tipo_acao}</span></td>
                  <td className="p-4"><span className="text-green-400 text-xs flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Ativo</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal do Formulário */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold">Cadastrar Novo Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome Completo</label>
                <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: João Silva" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">WhatsApp</label>
                  <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tipo de Ação</label>
                  <input value={tipoAcao} onChange={e => setTipoAcao(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Trabalhista" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Resumo do Caso</label>
                <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white h-24 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Conte brevemente o problema..." />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/40">Salvar Lead no Sistema</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = { blue: 'text-blue-400', green: 'text-green-400', yellow: 'text-yellow-400', purple: 'text-purple-400' };
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
      <div className={`${colors[color]} mb-4`}>{icon}</div>
      <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
