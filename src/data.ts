import { Transaction, CategoryBudget, Goal } from './types';

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Supermercado Pão de Açúcar',
    category: 'Alimentação',
    date: '2023-10-15T14:30:00Z',
    status: 'completed',
    amount: 450.20,
    type: 'expense',
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: '2',
    description: 'Salário Mensal - Empresa X',
    category: 'Renda',
    date: '2023-10-12T09:00:00Z',
    status: 'completed',
    amount: 6500.00,
    type: 'income',
    paymentMethod: 'Transferência bancária'
  },
  {
    id: '3',
    description: 'Aluguel Apartamento',
    category: 'Moradia',
    date: '2023-10-10T10:00:00Z',
    status: 'pending',
    amount: 2200.00,
    type: 'expense',
    paymentMethod: 'Boleto bancário'
  },
  {
    id: '4',
    description: 'Netflix',
    category: 'Lazer',
    date: '2023-10-08T12:00:00Z',
    status: 'completed',
    amount: 55.90,
    type: 'expense',
    paymentMethod: 'Assinatura Digital'
  },
  {
    id: '5',
    description: 'Posto Ipiranga',
    category: 'Transporte',
    date: '2023-10-05T18:00:00Z',
    status: 'completed',
    amount: 320.00,
    type: 'expense',
    paymentMethod: 'Débito'
  }
];

export const initialCategories: CategoryBudget[] = [
  { id: 'c1', name: 'Moradia', color: '#1152d4', icon: 'home', budget: 2200, spent: 2200 },
  { id: 'c2', name: 'Alimentação', color: '#10b981', icon: 'shopping_cart', budget: 1000, spent: 800 },
  { id: 'c3', name: 'Transporte', color: '#f59e0b', icon: 'directions_car', budget: 800, spent: 480 },
  { id: 'c4', name: 'Lazer', color: '#ef4444', icon: 'restaurant', budget: 600, spent: 750 },
];

export const initialGoals: Goal[] = [
  { id: 'g1', name: 'Viagem de Natal', targetDate: 'Dezembro 2024', currentAmount: 4500, targetAmount: 6000, icon: 'flight_takeoff', color: 'primary' },
  { id: 'g2', name: 'Reserva de Emergência', targetDate: 'Faltam 8 meses', currentAmount: 12000, targetAmount: 30000, icon: 'emergency', color: 'amber' },
];
