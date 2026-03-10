import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface UserManagementProps {
  showToast: (msg: string) => void;
}

export default function UserManagement({ showToast }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([
    { id: '1', email: 'admin@familia.com', created_at: new Date().toISOString() }
  ]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword) return;
    
    setLoading(true);
    // Mocking API call
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        email: newEmail,
        created_at: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      showToast('Usuário criado com sucesso!');
      setNewEmail('');
      setNewPassword('');
      setIsAdding(false);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    setLoading(true);
    // Mocking API call
    setTimeout(() => {
      setUsers(users.filter(u => u.id !== id));
      showToast('Usuário excluído com sucesso!');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Membros da Família</h3>
          <p className="text-sm text-slate-500">Gerencie quem tem acesso ao seu painel financeiro.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">{isAdding ? 'close' : 'person_add'}</span>
          {isAdding ? 'Cancelar' : 'Novo Usuário'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddUser} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-4">
          <h4 className="font-medium text-slate-900 dark:text-white">Adicionar Novo Usuário</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="email@exemplo.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Usuário'}
            </button>
          </div>
        </form>
      )}

      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Data de Criação</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  {loading ? 'Carregando...' : 'Nenhum usuário encontrado.'}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={loading}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Excluir usuário"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
