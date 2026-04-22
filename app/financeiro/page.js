"use client";
import React from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function FinanceiroPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-white">Financeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem]">
          <div className="flex items-center gap-4 text-green-400 mb-4">
            <ArrowUpCircle size={24} />
            <span className="font-bold uppercase text-[10px] tracking-widest">Entradas</span>
          </div>
          <p className="text-4xl font-black text-white font-mono">R$ 0,00</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem]">
          <div className="flex items-center gap-4 text-red-400 mb-4">
            <ArrowDownCircle size={24} />
            <span className="font-bold uppercase text-[10px] tracking-widest">Saídas</span>
          </div>
          <p className="text-4xl font-black text-white font-mono">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
}
