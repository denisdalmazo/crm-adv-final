"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function PrazosPage() {
  const [prazos, setPrazos] = useState([]);

  useEffect(() => {
    async function loadPrazos() {
      const { data } = await supabase
        .from('processos')
        .select(`*, leads(nome)`)
        .order('prazo_fatal', { ascending: true });
      if (data) setPrazos(data);
    }
    loadPrazos();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Agenda de Prazos</h1>
          <p className="text-slate-500 text-sm">Controle de prazos fatais e audiências</p>
        </div>
      </header>

      <div className="grid gap-4">
        {prazos.length === 0 ? (
          <div className="bg-slate-800/50 p-10 rounded-2xl border border-dashed border-slate-700 text-center text-slate-500">
            Nenhum prazo cadastrado ou carregando...
          </div>
        ) : (
          prazos.map((item) => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{item.numero_processo}</h3>
                  <p className="text-sm text-slate-400">Cliente: <span className="text-white">{item.leads?.nome}</span></p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prazo Fatal</p>
                <p className="text-xl font-black text-red-500">
                  {new Date(item.prazo_fatal).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}