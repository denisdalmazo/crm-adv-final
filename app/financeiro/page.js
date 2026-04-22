"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DollarSign, Wallet, ArrowUpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function FinanceiroPage() {
  const [processos, setProcessos] = useState([]);
  const [resumo, setResumo] = useState({ total: 0, pendente: 0, recebido: 0 });

  useEffect(() => {
    async function loadFinanceiro() {
      const { data } = await supabase.from('processos').select(`*, leads(nome)`);
      if (data) {
        setProcessos(data);
        const recebido = data.filter(p => p.pago).reduce((acc, curr) => acc + Number(curr.valor_honorarios), 0);
        const pendente = data.filter(p => !p.pago).reduce((acc, curr) => acc + Number(curr.valor_honorarios), 0);
        setResumo({ total: recebido + pendente, recebido, pendente });
      }
    }
    loadFinanceiro();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold">Gestão Financeira</h1>
        <p className="text-slate-500">Controle de honorários e recebimentos do escritório.</p>
      </header>

      {/* CARDS FINANCEIROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total em Contratos</p>
          <p className="text-3xl font-black text-white">R$ {resumo.total.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Total Recebido</p>
          <p className="text-3xl font-black text-green-400">R$ {resumo.recebido.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">A Receber (Pendentes)</p>
          <p className="text-3xl font-black text-orange-400">R$ {resumo.pendente.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* LISTA DE LANÇAMENTOS */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black">
            <tr>
              <th className="p-5">Processo / Cliente</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5 text-right">Valor Honorários</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {processos.map((p) => (
              <tr key={p.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="p-5">
                  <div className="font-bold text-slate-100">{p.numero_processo}</div>
                  <div className="text-xs text-slate-500">{p.leads?.nome}</div>
                </td>
                <td className="p-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.pago ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                    {p.pago ? 'Pago' : 'Pendente'}
                  </span>
                </td>
                <td className="p-5 text-right font-mono font-bold text-white">
                  R$ {Number(p.valor_honorarios).toLocaleString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}