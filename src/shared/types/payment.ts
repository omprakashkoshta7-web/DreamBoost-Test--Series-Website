// Payment/Transaction types
export interface ITransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'upi' | 'bank_transfer';
  details: Record<string, any>;
  isDefault: boolean;
}
