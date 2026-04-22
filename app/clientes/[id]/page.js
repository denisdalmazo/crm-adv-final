"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageCircle, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function DetalhesCliente({ params }) {
  const [cliente, setCliente] = useState(null);
  const [interacoes, setInteracoes] = useState([]);
  const [novoRelato, setNovoRelato] = useState('');

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
    await supabase.from('interacoes').insert([{ cliente_id: params.id, relato: novoRelato }]);
    setNovoRelato('');
    // Recarregar lista
    const { data } = await supabase.from('interacoes').select('*').eq('cliente_id', params.id).order('data_contato', { ascending: false });
    setInteracoes(data);
  }

  if (!cliente) return <div className="p-10 text-white">Carregando ficha do cliente...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Link href="/clientes" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={18}/> Voltar para lista
      </Link>

      <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-black text-white">{cliente.nome}</h1>
        <p className="text-blue-400 font-bold uppercase text-xs tracking-widest mt-1">{cliente.tipo_acao}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lado Esquerdo: Nova Interação */}
        <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-green-400"/> Registrar Atendimento</h3>
          <textarea 
            value={novoRelato} onChange={(e) => setNovoRelato(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white h-40 focus:border-blue-500 outline-none transition-all"
            placeholder="O que foi conversado hoje?"
          />
          <button 
            onClick={salvarRelato}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
            <Save size={18}/> Salvar Histórico
          </button>
        </div>

        {/* Lado Direito: Linha do Tempo */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold px-2">Histórico Recente</h3>
          {interacoes.map((i) => (
            <div key={i.id} className="bg-slate-800/30 border-l-4 border-blue-600 p-4 rounded-r-2xl">
              <p className="text-xs text-slate-500 font-bold mb-2">{new Date(i.data_contato).toLocaleString('pt-BR')}</p>
              <p className="text-slate-200 text-sm leading-relaxed">{i.relato}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}