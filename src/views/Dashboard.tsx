import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { initialTransactions, initialCategories } from '../data';

interface DashboardProps {
  setActiveView: (view: string) => void;
  showToast: (msg: string) => void;
}

export default function Dashboard({ setActiveView, showToast }: DashboardProps) {
  const pieData = initialCategories.map(c => ({
    name: c.name,
    value: c.spent,
    color: c.color
  }));

  const barData = [
    { name: 'JAN', entradas: 6000, saidas: 4500 },
    { name: 'FEV', entradas: 7500, saidas: 5000 },
    { name: 'MAR', entradas: 8500, saidas: 4000 },
    { name: 'ABR', entradas: 6500, saidas: 5500 },
    { name: 'MAI', entradas: 9000, saidas: 4800 },
    { name: 'JUN', entradas: 8000, saidas: 4200 },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-white/80 text-sm font-medium">Saldo Total</span>
            <span className="material-symbols-outlined opacity-80">account_balance</span>
          </div>
          <div className="text-3xl font-bold mb-2">R$ 12.450,00</div>
          <div className="flex items-center gap-1 text-sm text-green-300">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            <span>+5.2% em relação ao mês anterior</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-medium">Entradas (Mês)</span>
            <span className="material-symbols-outlined text-green-500">arrow_circle_up</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">R$ 8.200,00</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[85%]"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-medium">Saídas (Mês)</span>
            <span className="material-symbols-outlined text-red-500">arrow_circle_down</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">R$ 4.500,00</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[45%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Distribution Chart Card */}
        <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Gastos por Categoria</h3>
            <button onClick={() => setActiveView('budget')} className="text-primary text-sm font-semibold hover:underline">Ver Detalhes</button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="relative size-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">R$ 4.5k</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total Saídas</span>
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              {initialCategories.map((cat) => {
                const percentage = Math.round((cat.spent / 4500) * 100);
                return (
                  <div key={cat.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span>{cat.name} ({percentage}%)</span>
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      R$ {cat.spent.toLocaleString('pt-BR')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Entradas vs Saídas Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Resumo: Entradas vs Saídas</h3>
            <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold py-1.5 px-3 outline-none">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="entradas" fill="#1152d4" opacity={0.4} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="saidas" fill="#1152d4" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-center gap-8 border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-primary/40"></div>
              <span className="text-xs text-slate-500">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-primary"></div>
              <span className="text-xs text-slate-500">Saídas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold">Últimas Transações</h3>
          <button onClick={() => showToast('Abrindo formulário de Nova Transação...')} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Nova Transação
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 font-bold">Descrição</th>
                <th className="pb-4 font-bold">Categoria</th>
                <th className="pb-4 font-bold">Data</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 text-right font-bold">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {initialTransactions.slice(0, 4).map((tx) => {
                const isIncome = tx.type === 'income';
                const cat = initialCategories.find(c => c.name === tx.category);
                
                // Determine colors based on category or type
                let iconBg = 'bg-slate-100 dark:bg-slate-800';
                let iconColor = 'text-slate-600 dark:text-slate-400';
                let iconName = 'receipt';

                if (cat) {
                  iconName = cat.icon;
                  if (cat.name === 'Alimentação') { iconBg = 'bg-red-100 dark:bg-red-500/20'; iconColor = 'text-red-600 dark:text-red-400'; }
                  if (cat.name === 'Moradia') { iconBg = 'bg-red-100 dark:bg-red-500/20'; iconColor = 'text-red-600 dark:text-red-400'; }
                  if (cat.name === 'Transporte') { iconBg = 'bg-amber-100 dark:bg-amber-500/20'; iconColor = 'text-amber-600 dark:text-amber-400'; }
                }
                if (isIncome) {
                  iconBg = 'bg-green-100 dark:bg-green-500/20';
                  iconColor = 'text-green-600 dark:text-green-400';
                  iconName = 'payments';
                }

                return (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
                          <span className="material-symbols-outlined">{iconName}</span>
                        </div>
                        <span className="font-medium">{tx.description}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-500">{tx.category}</td>
                    <td className="py-4 text-sm text-slate-500">
                      {new Date(tx.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4">
                      {tx.status === 'completed' ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded">Concluído</span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase rounded">Pendente</span>
                      )}
                    </td>
                    <td className={`py-4 text-right font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isIncome ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => setActiveView('transactions')} className="text-sm font-semibold text-primary hover:bg-primary/10 px-6 py-2 rounded-lg transition-all">
            Ver Histórico Completo
          </button>
        </div>
      </div>
    </div>
  );
}
