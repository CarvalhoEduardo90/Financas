import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
  showToast: (msg: string) => void;
}

export default function Login({ onLogin, showToast }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        showToast('Cadastro realizado com sucesso! Verifique seu email se necessário.');
        // Auto-login after signup if email confirmation is disabled, otherwise prompt to check email
        // For simplicity, we'll try to just log them in or let them know it worked.
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
            onLogin();
        } else {
            setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        showToast('Login realizado com sucesso!');
        onLogin();
      }
    } catch (error: any) {
      showToast(error.message || 'Ocorreu um erro durante a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex justify-center mb-8">
          <div className="size-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-white">
          {isSignUp ? 'Criar uma conta' : 'Bem-vindo de volta'}
        </h2>
        <p className="text-center text-slate-500 mb-8">
          {isSignUp ? 'Cadastre-se para gerenciar suas finanças' : 'Faça login para acessar seu painel'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              isSignUp ? 'Cadastrar' : 'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline font-medium"
          >
            {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}
