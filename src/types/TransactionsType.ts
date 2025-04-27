import { Budget } from "./Budgets";

export type Transaction = {
  _id?: string;
  description?: string;
  amount?: number;
  date?: string;
  category?: string;
};

export interface TransactionFormProps {
  isEditing: boolean;
  selectedTransaction: Transaction | null;
  refreshTransactions?: () => void;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  refreshTransactions?: () => void;
}

export interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export interface TransactionFormState {
  amount: string;
  date: string;
  category: string;
  description: string;
}
