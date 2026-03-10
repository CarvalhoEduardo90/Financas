import React from 'react';

interface MobileNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  showToast: (msg: string) => void;
}

export default function MobileNav({ activeView, setActiveView, showToast }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Resumo', icon: 'dashboard' },
    { id: 'transactions', label: 'Extrato', icon: 'receipt_long' },
    { id: 'budget', label: 'Orçamento', icon: 'account_balance_wallet' },
    { id: 'settings', label: 'Metas', icon: 'trending_up' },
  ];

  return (
    <footer className="lg:hidden sticky bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      <button
        onClick={() => setActiveView('dashboard')}
        className={`flex flex-col items-center gap-1 ${activeView === 'dashboard' ? 'text-primary' : 'text-slate-400'}`}
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-bold">Resumo</span>
      </button>
      <button
        onClick={() => setActiveView('budget')}
        className={`flex flex-col items-center gap-1 ${activeView === 'budget' ? 'text-primary' : 'text-slate-400'}`}
      >
        <span className="material-symbols-outlined">account_balance_wallet</span>
        <span className="text-[10px] font-bold">Orçamento</span>
      </button>
      <div className="-mt-8">
        <button onClick={() => showToast('Abrindo formulário de Nova Transação...')} className="size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
      <button
        onClick={() => setActiveView('settings')}
        className={`flex flex-col items-center gap-1 ${activeView === 'settings' ? 'text-primary' : 'text-slate-400'}`}
      >
        <span className="material-symbols-outlined">trending_up</span>
        <span className="text-[10px] font-bold">Metas</span>
      </button>
      <button
        onClick={() => setActiveView('transactions')}
        className={`flex flex-col items-center gap-1 ${activeView === 'transactions' ? 'text-primary' : 'text-slate-400'}`}
      >
        <span className="material-symbols-outlined">receipt_long</span>
        <span className="text-[10px] font-bold">Extrato</span>
      </button>
    </footer>
  );
}
