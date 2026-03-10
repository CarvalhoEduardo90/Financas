export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending';

export interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  status: TransactionStatus;
  amount: number;
  type: TransactionType;
  paymentMethod?: string;
}

export interface CategoryBudget {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget: number;
  spent: number;
}

export interface Goal {
  id: string;
  name: string;
  targetDate: string;
  currentAmount: number;
  targetAmount: number;
  icon: string;
  color: string;
}
