"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Scale, Clock, CheckCircle, Plus, X, MessageSquare, Trash2, Edit3 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o formulário (Cadastro/Edição)
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoAcao, setTipoAcao] = useState('');
  const [status, setStatus] = useState('Novo');
  const [descricao, setDescricao] = useState('');

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

  // Abre o modal para Edição
  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setNome(lead.nome);
    setTelefone(lead.telefone);
    setTipoAcao(lead.tipo_acao);
    setStatus(lead.status);
    setDescricao(lead.descricao);
    setIsModalOpen(true);
  };

  // Deleta um Lead
  const handleDelete = async (id, nome) => {
    if (confirm(`Tem certeza que deseja excluir o lead de ${nome}?`)) {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) fetchLeads();
      else alert("Erro ao excluir");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { nome, telefone, tipo_acao: tipoAcao, status, descricao };

    if (editingId) {
      // Lógica de Atualizar
      const { error } = await supabase.from('leads').update(payload).eq('id', editingId);
      if (error) alert("Erro ao atualizar: " + error.message);
    } else {
      // Lógica de Inserir
      const { error } = await supabase.from('leads').insert([payload]);
      if (error) alert("Erro ao salvar: " + error.message);
    }

    // Resetar e fechar
    setEditingId(null);
    setNome(''); setTelefone(''); setTipoAcao(''); setStatus('Novo'); setDescricao('');
    setIsModalOpen(false);
    fetchLeads();
  }

  const openWhatsApp = (lead) => {
    if (!lead.telefone) return alert("Telefone não cadastrado");
    const cleanPhone = lead.telefone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá ${lead.nome}, aqui é da Dalmazo Advogados.`);
    window.open(`https://wa.me/55${cleanPhone}?text=${message}`, '_blank');
  };

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
      <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">DALMAZO | CRM</h1>
          <p className="text-slate-500 text-[10px] uppercase font-black">Gestão Jurídica Ativa</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <Plus size={18} /> Novo Lead
        </button>
      </header>

      <main className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} color="blue" />
        <StatCard label="Triagem" value={stats.triagem} color="yellow" />
        <StatCard label="Espera" value={stats.aguardando} color="purple" />
        <StatCard label="Contratos" value={stats.convertidos} color="green" />
      </main>

      <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black">
              <tr>
                <th className="p-4 text-center w-20">Ações</th>
                <th className="p-4">Cliente / Tel</th>
                <th className="p-4">Área</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Apagar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {leads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 text-center flex gap-2 justify-center">
                    <button onClick={() => openWhatsApp(lead)} className="bg-green-500 hover:bg-green-400 text-slate-900 p-2 rounded-lg transition-all shadow-md shadow-green-900/20">
                      <MessageSquare size={14} fill="currentColor" />
                    </button>
                    <button onClick={() => handleEdit(lead)} className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white p-2 rounded-lg transition-all border border-blue-500/30">
                      <Edit3 size={14} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm">{lead.nome}</div>
                    <div className="text-[10px] text-slate-500">{lead.telefone}</div>
                  </td>
                  <td className="p-4 text-xs text-slate-300">{lead.tipo_acao}</td>
                  <td className="p-4 text-center text-xs">
                    <span className={`px-2 py-1 rounded-md border font-bold ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(lead.id, lead.nome)} className="text-slate-600 hover:text-red-500 p-2 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-400">{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Nome" />
              <div className="grid grid-cols-2 gap-4">
                <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Zap com DDD" />
                <input value={tipoAcao} onChange={e => setTipoAcao(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Área Jurídica" />
              </div>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500">
                <option value="Novo">Novo</option>
                <option value="Triagem">Triagem</option>
                <option value="Aguardando">Aguardando</option>
                <option value="Convertido">Convertido</option>
              </select>
              <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 h-24 text-white focus:border-blue-500 outline-none" placeholder="Relato do caso" />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all uppercase tracking-widest text-sm">
                {editingId ? 'Salvar Alterações' : 'Cadastrar Lead'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = { blue: 'text-blue-400', yellow: 'text-yellow-400', purple: 'text-purple-400', green: 'text-green-400' };
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
      <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{label}</div>
      <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}
