import React, { useState } from 'react';
import { initialTransactions, initialCategories } from '../data';

interface TransactionsProps {
  showToast: (msg: string) => void;
}

export default function Transactions({ showToast }: TransactionsProps) {
  const [filterType, setFilterType] = useState('Tudo');

  const filteredTransactions = initialTransactions.filter(tx => {
    if (filterType === 'Entradas') return tx.type === 'income';
    if (filterType === 'Saídas') return tx.type === 'expense';
    return true;
  });

  const totalEntradas = initialTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalSaidas = initialTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const saldoAtual = totalEntradas - totalSaidas;

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">Transações Detalhadas</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerencie e monitore o fluxo de caixa da sua família.</p>
        </div>
        <button onClick={() => showToast('Abrindo formulário de Nova Transação...')} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Nova Transação
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Período</label>
            <select className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm py-2.5 focus:ring-primary outline-none">
              <option>Este Mês (Outubro)</option>
              <option>Mês Passado</option>
              <option>Últimos 90 dias</option>
              <option>Ano atual</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Categoria</label>
            <select className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm py-2.5 focus:ring-primary outline-none">
              <option>Todas as categorias</option>
              {initialCategories.map(c => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Tipo</label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              {['Tudo', 'Entradas', 'Saídas'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${
                    filterType === type
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-primary'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'income';
                const cat = initialCategories.find(c => c.name === tx.category);
                
                let badgeBg = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
                let iconName = 'receipt';

                if (cat) {
                  iconName = cat.icon;
                  if (cat.name === 'Alimentação') badgeBg = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
                  if (cat.name === 'Moradia') badgeBg = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
                  if (cat.name === 'Transporte') badgeBg = 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400';
                  if (cat.name === 'Lazer') badgeBg = 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
                }
                if (isIncome) {
                  badgeBg = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
                  iconName = 'payments';
                }

                return (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">
                      {new Date(tx.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{tx.description}</span>
                        <span className="text-xs text-slate-400">{tx.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeBg}`}>
                        <span className="material-symbols-outlined text-[14px]">{iconName}</span>
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${isIncome ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isIncome ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {tx.status === 'completed' ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {isIncome ? 'Recebido' : 'Pago'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            Pendente
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => showToast('Opções da transação')} className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Mostrando {filteredTransactions.length} de {initialTransactions.length} transações</span>
          <div className="flex gap-2">
            <button onClick={() => showToast('Página anterior')} className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button onClick={() => showToast('Próxima página')} className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards (Quick View) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Entradas</span>
            <span className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </span>
          </div>
          <p className="text-2xl font-bold text-emerald-500">R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Saídas</span>
            <span className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">trending_down</span>
            </span>
          </div>
          <p className="text-2xl font-bold text-red-500">R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary text-sm font-semibold">Saldo Atual</span>
            <span className="p-2 bg-primary/20 text-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </span>
          </div>
          <p className="text-2xl font-black text-primary">R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  );
}
