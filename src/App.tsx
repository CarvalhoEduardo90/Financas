/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import Transactions from './views/Transactions';
import Budget from './views/Budget';
import TransactionModal from './components/TransactionModal';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (!error && data) {
      setTransactions(data);
    } else if (error) {
      console.error('Error fetching transactions:', error);
    }
    setLoading(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openModal = () => setIsModalOpen(true);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} showToast={showToast} openModal={openModal} transactions={transactions} loading={loading} />;
      case 'transactions':
        return <Transactions showToast={showToast} openModal={openModal} transactions={transactions} loading={loading} />;
      case 'budget':
        return <Budget showToast={showToast} openModal={openModal} transactions={transactions} loading={loading} />;
      default:
        return <Dashboard setActiveView={setActiveView} showToast={showToast} openModal={openModal} transactions={transactions} loading={loading} />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Resumo Financeiro';
      case 'transactions':
        return 'Transações';
      case 'budget':
        return 'Orçamento';
      default:
        return 'Resumo Financeiro';
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {activeView !== 'budget' && <Header title={getTitle()} showToast={showToast} />}
        
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {renderView()}
        </main>
        
        <MobileNav activeView={activeView} setActiveView={setActiveView} showToast={showToast} openModal={openModal} />

        <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchTransactions} showToast={showToast} />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
