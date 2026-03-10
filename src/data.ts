import { Transaction, CategoryBudget, Goal } from './types';

export const initialTransactions: Transaction[] = [];

export const initialCategories: CategoryBudget[] = [
  { id: 'c1', name: 'Moradia', color: '#1152d4', icon: 'home', budget: 2000, spent: 0 },
  { id: 'c2', name: 'Alimentação', color: '#10b981', icon: 'shopping_cart', budget: 1500, spent: 0 },
  { id: 'c3', name: 'Transporte', color: '#f59e0b', icon: 'directions_car', budget: 800, spent: 0 },
  { id: 'c4', name: 'Lazer', color: '#ef4444', icon: 'restaurant', budget: 500, spent: 0 },
  { id: 'c5', name: 'Outros', color: '#8b5cf6', icon: 'category', budget: 500, spent: 0 },
];

export const initialGoals: Goal[] = [];
