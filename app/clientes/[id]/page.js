"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Eye, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function ListaClientes() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (data) setLeads(data);
    }
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clientes & Leads</h2>
        <button className="bg-blue-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> Novo
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-500 text-[10px] uppercase font-black">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{lead.nome}</div>
                  <div className="text-xs text-slate-500">{lead.tipo_acao}</div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                    {lead.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {/* BOTÃO QUE ABRE A FICHA - VERIFIQUE ESTA LINHA */}
                    <Link 
                      href={`/clientes/${lead.id}`} 
                      className="p-2 bg-slate-900 text-slate-400 hover:text-white hover:bg-blue-600 rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}