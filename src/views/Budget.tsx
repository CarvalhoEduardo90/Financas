import React from 'react';
import { initialCategories, initialGoals } from '../data';

interface BudgetProps {
  showToast: (msg: string) => void;
  openModal: () => void;
  transactions: any[];
  loading: boolean;
}

export default function Budget({ showToast, openModal, transactions, loading }: BudgetProps) {
  const categoriesWithSpent = initialCategories.map(c => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === c.name)
      .reduce((acc, t) => acc + Number(t.amount), 0);
    return { ...c, spent };
  });

  const totalBudget = categoriesWithSpent.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = categoriesWithSpent.reduce((acc, c) => acc + c.spent, 0);
  const percentageSpent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

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
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20">
              <img alt="Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtktZe1aeDvd_xrYhHAvydiFjRSAkDF3G8izzgP38at0CVIgVKGKZMGtKiTX-5uOOZMXdHONi7T_iDzcU2A7tLym2XZGQE7yO5vCd4g27C5ZwQbD3uysE3g80CSHV-1KCtEsovGfv2-lx2U6m3QuacP5Ng2PRnoSALN3D3tueblWDW5EbSjNUq4ScJ0dImULXwFYbRM2f4enQTbbuNOgd71vhDwaLf61Tr3xSGwA53FW6du0c1rrWDjPuRbp_DKmSu2stlx0YfVJ8"/>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Orçamento de Outubro</h1>
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
            <span className="text-sm text-red-500 font-medium">+12% vs set</span>
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
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-500">R$ 1.850,00</h3>
            <span className="text-sm text-green-500 font-medium">Meta: R$ 2k</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Você está quase na meta!</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Sugestão de Corte</span>
            <span className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 material-symbols-outlined">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Refeições fora</h3>
            <p className="text-sm text-slate-500">Pode economizar até <span className="text-primary font-bold">R$ 350</span> reduzindo pedidos de delivery.</p>
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
              <button onClick={() => showToast('Adicionar nova meta')} className="text-primary p-1 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-6">
              {initialGoals.map(goal => {
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
              <button onClick={() => showToast('Adicionar nova meta')} className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all flex flex-col items-center justify-center gap-1 group">
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
                <p className="text-blue-100 text-sm mt-1">Sua família está no caminho certo!</p>
              </div>
              <span className="material-symbols-outlined text-3xl opacity-50">verified_user</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img alt="Avatar 1" className="size-8 rounded-full border-2 border-primary object-cover bg-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtzwjM5bMzQfGBfu47O3akYTXK6_fCXybl6EJ4XH9BgNWrjKORVQKh7bua5TFp779cBQJqCtJHjuCV4ZKfFB52aigJWmSIz2x7DLgsjnW12qDSEHSgiJLT0BaKaU558u0EAF3nGjpJEg11jOUKHVsXSxWXeEQMSE6nmXm1l376nAsMDqppBHdpipMgKXdEi9ZEKKB2DeUfGTAfosTDMUXCHHUDF4jpkIx7-BE0r1IlAJWt7CX7MROl-seuP6Utokj4L7e-HLg9_Ok"/>
                <img alt="Avatar 2" className="size-8 rounded-full border-2 border-primary object-cover bg-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcs99JDwOqf_goMotRyAvZxas7ykoNCpQ80Odz5C7fxuaNcKXOCeerTsoaek7nrbNRhT87pc4_6SnD0dnCtprF0PcwGuvVRIt5iHQuDwMI-pL3pNoMAEQYaUU5IPn47e9icpdJeU6VLBwHzqU_9fbOaHk10eTXJM376QKId0S-DknTPumwoltjts1MjYAwI02AuVDlBES9wb4vWvzww1qv3acoF3F2_eONZ2kQlWETw9KZOsSMNHUkDyL_nSLDGeBihAftVgZTzrU"/>
                <img alt="Avatar 3" className="size-8 rounded-full border-2 border-primary object-cover bg-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAydvgmS03FMe-VXTJZl40bvc0ab88GM5ZMG5l2alrwF6AEOzlhFXsElER7NZwzj1WTGrHwk_FuBbHQ0P2bZjxGGM0awVFRi1AT9IeNdVrGtDbcuFfO4Nf-0NtY60ht07668YqNUBytba-HPGubyRNEm7qrR43F4TnVp14NHg7MNhC3fOlTOUHVA90xxudcjWmC7rfh5W_oAS3NPapWYBusblAGrCGtI-QgWPF_cflYwrFyqMJnUvXR0WAXXZSO2gb9Ehr0FbFwUzY"/>
              </div>
              <span className="text-xs font-medium">3 membros economizando este mês</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div onClick={() => showToast('Detalhes da oportunidade')} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-amber-500 mb-2">subscriptions</span>
            <h4 className="font-bold text-sm">Assinaturas Inativas</h4>
            <p className="text-xs text-slate-500 mt-1">Identificamos 2 streamings que você não acessa há 30 dias.</p>
            <p className="text-xs font-bold text-primary mt-3">Economize R$ 64,90</p>
          </div>
          <div onClick={() => showToast('Detalhes da oportunidade')} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-green-500 mb-2">bolt</span>
            <h4 className="font-bold text-sm">Eficiência Energética</h4>
            <p className="text-xs text-slate-500 mt-1">Seu gasto com luz subiu 15%. Tente reduzir o uso do ar-condicionado.</p>
            <p className="text-xs font-bold text-primary mt-3">Potencial: R$ 80,00</p>
          </div>
          <div onClick={() => showToast('Detalhes da oportunidade')} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-blue-500 mb-2">fastfood</span>
            <h4 className="font-bold text-sm">Planejamento de Refeições</h4>
            <p className="text-xs text-slate-500 mt-1">Cozinhar em casa aos domingos pode reduzir gastos com iFood.</p>
            <p className="text-xs font-bold text-primary mt-3">Potencial: R$ 200,00</p>
          </div>
          <div onClick={() => showToast('Detalhes da oportunidade')} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-purple-500 mb-2">local_offer</span>
            <h4 className="font-bold text-sm">Dia de Ofertas</h4>
            <p className="text-xs text-slate-500 mt-1">Terças-feiras são 10% mais baratas no Hortifruti parceiro.</p>
            <p className="text-xs font-bold text-primary mt-3">Economia de ~R$ 40,00</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
