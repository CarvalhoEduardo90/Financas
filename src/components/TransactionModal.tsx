import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  showToast: (msg: string) => void;
}

export default function TransactionModal({ isOpen, onClose, onSuccess, showToast }: TransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('transactions').insert([
      {
        description,
        amount: parseFloat(amount),
        type,
        category,
        date,
        user_avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtktZe1aeDvd_xrYhHAvydiFjRSAkDF3G8izzgP38at0CVIgVKGKZMGtKiTX-5uOOZMXdHONi7T_iDzcU2A7tLym2XZGQE7yO5vCd4g27C5ZwQbD3uysE3g80CSHV-1KCtEsovGfv2-lx2U6m3QuacP5Ng2PRnoSALN3D3tueblWDW5EbSjNUq4ScJ0dImULXwFYbRM2f4enQTbbuNOgd71vhDwaLf61Tr3xSGwA53FW6du0c1rrWDjPuRbp_DKmSu2stlx0YfVJ8'
      }
    ]);

    setLoading(false);

    if (error) {
      showToast('Erro ao salvar: ' + error.message);
    } else {
      showToast('Transação salva com sucesso no Supabase!');
      onSuccess();
      onClose();
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Nova Transação</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'expense'} onChange={() => setType('expense')} className="text-primary focus:ring-primary w-4 h-4" />
                <span className="font-medium">Despesa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'income'} onChange={() => setType('income')} className="text-green-500 focus:ring-green-500 w-4 h-4" />
                <span className="font-medium">Receita</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <input required type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Ex: Supermercado" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Valor (R$)</label>
            <input required type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
              <option value="Alimentação">Alimentação</option>
              <option value="Moradia">Moradia</option>
              <option value="Transporte">Transporte</option>
              <option value="Lazer">Lazer</option>
              <option value="Renda">Renda</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data</label>
            <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-6 hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {loading ? 'Salvando...' : 'Salvar Transação'}
          </button>
        </form>
      </div>
    </div>
  );
}
