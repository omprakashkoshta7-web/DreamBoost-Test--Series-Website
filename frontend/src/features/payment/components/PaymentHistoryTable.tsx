import React from 'react';
import { Card, Table } from '@shared/components';
import { Download } from '@shared/icons';

interface PaymentHistoryTableProps {
  transactions: any[];
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({ transactions }) => {
  if (transactions.length === 0) return null;

  const columns = [
    { key: 'transactionId', header: 'Transaction ID', render: (txn: any) => <span className="font-mono text-tb-gray-600">{txn.transactionId || txn._id}</span> },
    { key: 'plan', header: 'Plan', render: (txn: any) => <span className="font-medium text-tb-navy">{txn.plan}</span> },
    { key: 'date', header: 'Date', className: 'hidden sm:table-cell', render: (txn: any) => <span className="text-tb-gray-500">{new Date(txn.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span> },
    { key: 'amount', header: 'Amount', className: 'text-right', render: (txn: any) => <span className="font-bold text-tb-navy">₹{txn.amount}</span> },
    { key: 'action', header: 'Action', className: 'text-center', render: () => (
      <button className="p-1.5 rounded-lg hover:bg-tb-gray-100 text-tb-gray-400 hover:text-tb-navy transition-colors">
        <Download className="w-4 h-4" />
      </button>
    )},
  ];

  return (
    <Card title="Payment History">
      <div className="mt-4">
        <Table columns={columns} data={transactions} keyExtractor={(txn: any) => txn.transactionId || txn._id} className="border-0 bg-transparent shadow-none rounded-none" />
      </div>
    </Card>
  );
};

export default PaymentHistoryTable;
