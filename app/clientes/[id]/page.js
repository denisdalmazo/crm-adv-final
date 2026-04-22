"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageCircle, ArrowLeft, Save, Phone, User, Briefcase, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function FichaCliente({ params }) {
  const [cliente, setCliente] = useState(null);
  const [interacoes, setInteracoes] = useState([]);
  const [novoRelato, setNovoRelato] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      const { data: c } = await supabase.from('leads').select('*').eq('id', params.id).single();
      const { data: i } = await supabase.from('interacoes').select('*').eq('cliente_id', params.id).order('data_contato', { ascending: false });
      setCliente(c);
      setInteracoes(i || []);
    }
    carregarDados();
  }, [params.id]);

  async function salvarRelato() {
    if (!novoRelato) return;
    setSalvando(true);
    await supabase.from('interacoes').insert([{ cliente_id: params.id, relato: novoRelato }]);
    setNovoRelato('');
    const { data } = await supabase.from('interacoes').select('*').eq('cliente_id', params.id).order('data_contato', { ascending: false });
    setInteracoes(data);
    setSalvando(false);
  }

  // Função para abrir o WhatsApp
  const abrirWhatsapp = () => {
    if (!cliente?.telefone) return alert("Telefone não cadastrado");
    const num = cliente.telefone.replace(/\D/g, ''); // Limpa parênteses e traços
    window.open(`https://wa.me/55${num}`, '_blank');
  };

  if (!cliente) return <div className="p-10 text-white animate-pulse">Carregando ficha Dalmazo & Co...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <Link href="/clientes" className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm">
          <ArrowLeft size={18}/> VOLTAR
        </Link>
        <button 
          onClick={abrirWhatsapp}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all"
        >
          <Phone size={18}/> CHAMAR NO WHATSAPP
        </button>
      </div>

      {/* CABEÇALHO DA FICHA */}
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl flex justify-between items-end">
        <div>
          <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em]">Ficha do Cliente</span>
          <h1 className="text-4xl font-black text-white mt-1">{cliente.nome}</h1>
          <div className="flex gap-4 mt-4">
            <span className="flex items-center gap-2 text-slate-400 text-sm"><Briefcase size={16}/> {cliente.tipo_acao}</span>
            <span className="flex items-center gap-2 text-slate-400 text-sm"><User size={16}/> Status: <b className="text-blue-400">{cliente.status}</b></span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* COLUNA DA ESQUERDA: REGISTRO */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-3xl h-fit">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-blue-400"/> Novo Atendimento
            </h3>
            <textarea 
              value={novoRelato} onChange={(e) => setNovoRelato(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white h-40 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
              placeholder="Descreva o que foi tratado com o cliente..."
            />
            <button 
              onClick={salvarRelato}
              disabled={salvando}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              {salvando ? <RefreshCw className="animate-spin" size={18}/> : <Save size={18}/>} 
              {salvando ? "Salvando..." : "Salvar no Histórico"}
            </button>
          </div>
        </div>

        {/* COLUNA DA DIREITA: LINHA DO TEMPO */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 px-2">Histórico de Interações</h3>
          {interacoes.length === 0 && (
            <div className="p-10 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-600 italic">
              Nenhum registro de conversa ainda.
            </div>
          )}
          {interacoes.map((i) => (
            <div key={i.id} className="bg-slate-800/30 border-l-4 border-blue-600 p-5 rounded-r-2xl shadow-sm">
              <p className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-tighter">
                {new Date(i.data_contato).toLocaleString('pt-BR')}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{i.relato}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}