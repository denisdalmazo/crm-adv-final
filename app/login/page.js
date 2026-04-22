// app/login/page.js
"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verifica se é o usuário Master (você pode ajustar essa lógica)
      const isMaster = email.toLowerCase().includes('denis') || 
                      email.toLowerCase().includes('master') || 
                      email === 'seuemail@dominio.com'; // ← troque pelo seu email master

      // Redireciona para o dashboard
      router.push('/');
      router.refresh(); // força refresh para atualizar o layout

    } catch (error) {
      console.error(error);
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-4">
            <span className="text-white text-4xl font-black">DC</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            DALMAZO <span className="text-blue-500">&amp;</span> CO
          </h1>
          <p className="text-slate-400 mt-2">CRM Jurídico • Acesso Restrito</p>
        </div>

        {/* Card de Login */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Entrar no Sistema</h2>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl flex items-start gap-3 text-sm">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">E-mail</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-4 pl-12 pr-5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-4 pl-12 pr-5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition-all font-semibold py-4 rounded-2xl text-lg flex items-center justify-center gap-3 mt-8"
            >
              {loading ? (
                <>Entrando...</>
              ) : (
                <>
                  Entrar no CRM <User size={22} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 text-xs text-slate-500">
            <p>Usuários individuais veem apenas seus próprios dados.</p>
            <p className="mt-1">O usuário Master tem acesso total a todos os advogados.</p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          © 2026 Dalmazo & Co • CRM Jurídico
        </div>
      </div>
    </div>
  );
}