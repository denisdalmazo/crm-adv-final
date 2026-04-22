"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Plus, Eye, MessageSquare, Trash2, Search } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ListaClientes() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setLeads(data);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Clientes & Leads</h2>
          <p className="text-slate-500 text-sm">Gerencie sua carteira de clientes e novos contatos.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all">
          <Plus size={18} /> Novo Cliente
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="p-4">Cliente / Área</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors group">
                <td className="p-4">
                  <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{lead.nome}</div>
                  <div className="text-[11px] text-slate-500 font-medium uppercase">{lead.tipo_acao || 'Área não definida'}</div>
                </td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase">
                    {lead.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {/* ESTE É O LINK QUE ABRE A FICHA DO CLIENTE */}
                    <Link 
                      href={`/clientes/${lead.id}`} 
                      className="p-2 bg-slate-900 text-slate-400 hover:text-white hover:bg-blue-600 rounded-lg transition-all shadow-lg"
                      title="Ver Ficha e Histórico"
                    >
                      <Eye size={18} />
                    </Link>
                    
                    <button className="p-2 bg-slate-900 text-green-500 hover:bg-green-600 hover:text-white rounded-lg transition-all shadow-lg">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && !loading && (
          <div className="p-10 text-center text-slate-500 italic">
            Nenhum cliente encontrado.
          </div>
        )}
      </div>
    </div>
  );
}