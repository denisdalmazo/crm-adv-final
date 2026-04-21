"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Scale, Clock, CheckCircle, Plus, X, Phone, FileText, Filter } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoAcao, setTipoAcao] = useState('');
  const [status, setStatus] = useState('Novo');
  const [descricao, setDescricao] = useState('');

  // Cálculos dos Contadores
  const stats = {
    total: leads.length,
    triagem: leads.filter(l => l.status === 'Triagem').length,
    aguardando: leads.filter(l => l.status === 'Aguardando').length,
    convertidos: leads.filter(l => l.status === 'Convertido').length
  };

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
      .insert([{ nome, telefone, tipo_acao: tipoAcao, status, descricao }]);

    if (!error) {
      setNome(''); setTelefone(''); setTipoAcao(''); setStatus('Novo'); setDescricao('');
      setIsModalOpen(false);
      fetchLeads();
    } else {
      alert("Erro ao salvar: " + error.message);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Novo': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Triagem': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Aguardando': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Convertido': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-400 uppercase">Dalmazo Advogados</h1>
          <p className="text-slate-400 text-sm italic">Gestão Estratégica de Clientes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 transition-all px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/30"
        >
          <Plus size={20} /> Cadastrar Novo Cliente
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={20}/>} label="Total de Leads" value={stats.total} color="blue" />
        <StatCard icon={<Scale size={20}/>} label="Em Triagem" value={stats.triagem} color="yellow" />
        <StatCard icon={<Clock size={20}/>} label="Aguardando" value={stats.aguardando} color="purple" />
        <StatCard icon={<CheckCircle size={20}/>} label="Contratos Fechados" value={stats.convertidos} color="green" />
      </main>

      <section className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Filter size={18} className="text-blue-400"/> Lista de Atendimento</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="p-5 font-bold">Nome do Cliente</th>
                <th className="p-5 font-bold">WhatsApp / Tel</th>
                <th className="p-5 font-bold">Área Jurídica</th>
                <th className="p-5 font-bold text-center">Status Atual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center text-slate-500 italic">Sincronizando com Supabase...</td></tr>
              ) : leads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-700/40 transition-colors group">
                  <td className="p-5 font-semibold text-blue-50 group-hover:text-blue-400 transition-colors">{lead.nome}</td>
                  <td className="p-5 text-slate-400 font-mono">{lead.telefone || '---'}</td>
                  <td className="p-5"><span className="text-slate-300 bg-slate-700/50 border border-slate-600 px-3 py-1 rounded-md text-xs">{lead.tipo_acao}</span></td>
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl animate-in zoom-in duration-150">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-2xl font-bold text-blue-400">Novo Atendimento</h3>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-700 p-2 rounded-full hover:text-red-400"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase ml-1">Dados Principais</label>
                  <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none mt-2" placeholder="Nome completo do cliente" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input value={telefone} onChange={e => setTelefone(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="WhatsApp" />
                  <input value={tipoAcao} onChange={e => setTipoAcao(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Trabalhista" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase ml-1">Status Inicial</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none mt-2 appearance-none">
                    <option value="Novo">Novo Lead (Entrada)</option>
                    <option value="Triagem">Em Triagem / Análise</option>
                    <option value="Aguardando">Aguardando Documentos</option>
                    <option value="Convertido">Contrato Fechado</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase ml-1">Breve Relato</label>
                  <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white h-28 focus:ring-2 focus:ring-blue-500 outline-none mt-2" placeholder="Detalhes do caso..." />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/40 uppercase tracking-widest">Registrar Cliente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = { blue: 'text-blue-400', green: 'text-green-400', yellow: 'text-yellow-400', purple: 'text-purple-400' };
  const borderColors = { blue: 'border-blue-500/20', green: 'border-green-500/20', yellow: 'border-yellow-500/20', purple: 'border-purple-500/20' };
  return (
    <div className={`bg-slate-800/80 p-6 rounded-2xl border ${borderColors[color]} shadow-sm backdrop-blur-sm`}>
      <div className={`${colors[color]} mb-4 bg-slate-900 w-10 h-10 flex items-center justify-center rounded-lg`}>{icon}</div>
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-bold tracking-tighter">{value}</div>
    </div>
  );
}
