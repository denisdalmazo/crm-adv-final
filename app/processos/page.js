"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, Plus, Search, FileText } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function ProcessosPage() {
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    async function fetchProcessos() {
      const { data } = await supabase.from('processos').select('*, leads(nome)');
      if (data) setProcessos(data);
    }
    fetchProcessos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestão de Processos</h2>
        <button className="bg-blue-600 p-2 px-4 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18}/> Novo Processo
        </button>
      </div>
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-500 text-xs uppercase">
            <tr>
              <th className="p-4">Nº Processo</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Tribunal</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {processos.map((p) => (
              <tr key={p.id} className="hover:bg-slate-700/50">
                <td className="p-4 font-mono text-blue-400">{p.numero_processo}</td>
                <td className="p-4 font-bold">{p.leads?.nome}</td>
                <td className="p-4 text-slate-400">{p.tribunal}</td>
                <td className="p-4 text-right">
                  <span className="bg-green-500/10 text-green-500 p-1 px-3 rounded-full text-[10px] font-bold uppercase border border-green-500/20">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}