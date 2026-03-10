import React, { useState } from 'react';
import { initialCategories, initialGoals } from '../data';

interface BudgetProps {
  showToast: (msg: string) => void;
  openModal: () => void;
  transactions: any[];
  loading: boolean;
  userEmail?: string;
}

export default function Budget({ showToast, openModal, transactions, loading, userEmail = 'Usuário' }: BudgetProps) {
  const [goals, setGoals] = useState(initialGoals);

  const handleAddGoal = () => {
    const name = window.prompt('Qual o nome da nova meta? (ex: Viagem)');
    if (!name) return;
    
    const amountStr = window.prompt('Qual o valor total da meta? (ex: 5000)');
    if (!amountStr) return;
    
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      showToast('Valor inválido!');
      return;
    }

    const newGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: amount,
      currentAmount: 0,
      targetDate: 'Dez 2026',
      icon: 'star',
      color: 'primary'
    };

    setGoals([...goals, newGoal]);
    showToast('Meta adicionada com sucesso!');
  };

  const categoriesWithSpent = initialCategories.map(c => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === c.name)
      .reduce((acc, t) => acc + Number(t.amount), 0);
    return { ...c, spent };
  });

  const totalBudget = categoriesWithSpent.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = categoriesWithSpent.reduce((acc, c) => acc + c.spent, 0);
  const percentageSpent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const currentMonthName = new Date().toLocaleString('pt-BR', { month: 'long' });
  const capitalizedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail)}&background=0D8ABC&color=fff`;

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Navigation specific to Budget view */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight hidden sm:block">FinançaFamiliar</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span className="text-sm font-semibold">Plano Premium</span>
            </div>
            <button onClick={() => showToast('Nenhuma notificação no momento')} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20">
              <img alt="Profile" className="h-full w-full object-cover" src={avatarUrl}/>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Orçamento de {capitalizedMonth}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Gestão inteligente para a Família Silva</p>
            </div>
            <div className="flex gap-2">
              <button onClick={openModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Novo Gasto
              </button>
              <button onClick={() => showToast('Exportando relatório...')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-sm">ios_share</span>
                Exportar
              </button>
            </div>
          </div>
        </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Gasto Total</span>
            <span className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 material-symbols-outlined">trending_up</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${percentageSpent}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">{percentageSpent}% do teto mensal atingido</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Economia Acumulada</span>
            <span className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 material-symbols-outlined">savings</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-500">R$ 0,00</h3>
            <span className="text-sm text-green-500 font-medium">Meta: R$ 0,00</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Defina uma meta para começar!</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Sugestão de Corte</span>
            <span className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 material-symbols-outlined">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Sem sugestões</h3>
            <p className="text-sm text-slate-500">Adicione mais transações para receber dicas automáticas.</p>
          </div>
          <button onClick={() => showToast('Detalhes da sugestão de corte')} className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            VER DETALHES <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Categories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Acompanhamento por Categoria
            </h2>
            <div className="space-y-8">
              {categoriesWithSpent.map(cat => {
                const percent = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
                const isOver = percent > 100;
                const remaining = cat.budget - cat.spent;
                
                let barColor = 'bg-primary';
                let textColor = 'text-primary';
                if (isOver) {
                  barColor = 'bg-red-500';
                  textColor = 'text-red-500';
                } else if (percent === 100) {
                  barColor = 'bg-slate-400 dark:bg-slate-600';
                  textColor = 'text-slate-400';
                } else if (percent < 70) {
                  barColor = 'bg-green-500';
                  textColor = 'text-green-500';
                }

                return (
                  <div key={cat.id} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <span className="material-symbols-outlined">{cat.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold">{cat.name}</p>
                          <p className="text-xs text-slate-500">{percent}% utilizado</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {cat.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p className="text-xs text-slate-500">de R$ {cat.budget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs font-medium">
                      {isOver ? (
                        <span className="text-red-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          Estourou R$ {Math.abs(remaining).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Restam R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Savings Goals Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">target</span>
                Metas Ativas
              </h2>
              <button onClick={handleAddGoal} className="text-primary p-1 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-6">
              {goals.map(goal => {
                const percent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
                const isPrimary = goal.color === 'primary';
                
                return (
                  <div key={goal.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`size-10 rounded-full flex items-center justify-center ${isPrimary ? 'bg-primary/20 text-primary' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'}`}>
                        <span className="material-symbols-outlined">{goal.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{goal.name}</p>
                        <p className="text-xs text-slate-500">{goal.targetDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>R$ {goal.currentAmount.toLocaleString('pt-BR')} de R$ {goal.targetAmount.toLocaleString('pt-BR')}</span>
                      <span className="font-bold">{percent}%</span>
                    </div>
                    <div className="w-full bg-white dark:bg-slate-800 rounded-full h-2 border border-slate-200 dark:border-slate-700">
                      <div className={`${isPrimary ? 'bg-primary' : 'bg-amber-500'} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
              
              {/* New Goal CTA */}
              <button onClick={handleAddGoal} className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all flex flex-col items-center justify-center gap-1 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                <span className="text-sm font-medium">Adicionar meta de economia</span>
              </button>
            </div>
          </div>

          {/* Financial Health Card */}
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">Saúde Financeira</h3>
                <p className="text-blue-100 text-sm mt-1">Acompanhe seus gastos para manter a saúde financeira em dia.</p>
              </div>
              <span className="material-symbols-outlined text-3xl opacity-50">verified_user</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-medium">Mantenha suas transações atualizadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Insights Section */}
      <div className="mt-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span>
            Oportunidades de Economia
          </h2>
        </div>
        <div className="p-6 text-center text-slate-500">
          Adicione mais transações para que possamos analisar e sugerir oportunidades de economia personalizadas para você.
        </div>
      </div>
    </div>
    </div>
  );
}
