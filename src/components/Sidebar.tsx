import React from 'react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'transactions', label: 'Transações', icon: 'swap_horiz' },
    { id: 'budget', label: 'Orçamento', icon: 'account_balance_wallet' },
    { id: 'settings', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden lg:flex">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">family_restroom</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Família Silva</h1>
            <p className="text-xs text-slate-500">Gestão Colaborativa</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl">
          <p className="text-sm font-semibold text-primary mb-1">Dica do Mês</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">Você economizou 15% mais que no mês passado!</p>
        </div>
      </div>
    </aside>
  );
}
