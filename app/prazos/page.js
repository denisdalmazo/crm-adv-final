"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, AlertCircle, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PrazosPage() {
  const [prazos, setPrazos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrazos() {
      // Busca processos que têm prazo definido, trazendo o nome do cliente junto
      const { data, error } = await supabase
        .from('processos')
        .select(`
          *,
          leads ( nome )
        `)
        .not('prazo_fatal', 'is', null)
        .order('prazo_fatal', { ascending: true });

      if (!error) setPrazos(data || []);
      setLoading(false);
    }
    fetchPrazos();
  }, []);

  const formatarData = (dataIso) => {
    return new Date(dataIso).toLocaleDateString('pt-BR');
  };

  const calcularUrgencia = (dataIso) => {
    const hoje = new Date();
    const prazo = new Date(dataIso);
    const diferenca = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));
    
    if (diferenca < 0) return { label: 'Vencido', color: 'text-red-500 bg-red-500/10 border-red-500/20' };
    if (diferenca <= 3) return { label: 'Urgente', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' };
    return { label: 'No Prazo', color: 'text-green-500 bg-green-500/10 border-green-500/20' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Prazos e Agenda</h2>
        <p className="text-slate-500 text-sm font-medium">Controle de prazos fatais e audiências.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-slate-500 animate-pulse">Carregando agenda jurídica...</div>
        ) : prazos.length === 0 ? (
          <div className="bg-slate-800/50 p-12 rounded-3xl border border-dashed border-slate-700 text-center text-slate-500">
            <Calendar className="mx-auto mb-4 opacity-20" size={48} />
            <p>Nenhum prazo fatal cadastrado no momento.</p>
          </div>
        ) : (
          prazos.map((item) => {
            const urgencia = calcularUrgencia(item.prazo_fatal);
            return (
              <div key={item.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-500 transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${urgencia.color}`}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100">{item.numero_processo}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Cliente: <span className="text-blue-400">{item.leads?.nome || 'Não vinculado'}</span>
                    </p>
                    <p className="text-sm text-slate-300 mt-1 line-clamp-1">{item.descricao}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prazo Fatal</p>
                    <p className="text-lg font-black text-white">{formatarData(item.prazo_fatal)}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg border font-bold text-[10px] uppercase ${urgencia.color}`}>
                    {urgencia.label}
                  </div>
                  <button className="text-slate-500 group-hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}