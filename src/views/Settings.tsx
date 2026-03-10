import React from 'react';
import { supabase } from '../lib/supabase';

interface SettingsProps {
  showToast: (msg: string) => void;
  onLogout: () => void;
}

export default function Settings({ showToast, onLogout }: SettingsProps) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showToast('Sessão encerrada com sucesso.');
      onLogout();
    } catch (error: any) {
      showToast('Erro ao encerrar sessão: ' + error.message);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">manage_accounts</span>
          Gerenciamento de Conta
        </h2>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Sair da Conta</h3>
              <p className="text-sm text-slate-500">Encerre sua sessão atual de forma segura.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sair
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Membros da Família</h3>
              <p className="text-sm text-slate-500">Gerencie quem tem acesso ao seu painel financeiro.</p>
            </div>
            <button 
              onClick={() => showToast('Funcionalidade em desenvolvimento')}
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">group_add</span>
              Convidar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">tune</span>
          Preferências do Aplicativo
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Notificações</h3>
              <p className="text-sm text-slate-500">Receba alertas sobre metas e vencimentos.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => showToast('Preferência salva')} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Moeda Padrão</h3>
              <p className="text-sm text-slate-500">Moeda utilizada para exibir os valores.</p>
            </div>
            <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary">
              <option value="BRL">BRL (R$)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
