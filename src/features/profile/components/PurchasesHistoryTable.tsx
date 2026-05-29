import React from 'react';
import { Card, Badge, Table } from '@shared/components';

interface Purchase {
  id: string;
  plan: string;
  date: string;
  amount: string;
  status: string;
}

interface PurchasesHistoryTableProps {
  purchases: Purchase[];
}

const PurchasesHistoryTable: React.FC<PurchasesHistoryTableProps> = ({ purchases }) => {
  const columns = [
    { key: 'orderId', header: 'Order ID', render: (p: Purchase) => <span className="font-mono text-tb-gray-600">{typeof p.id === 'string' ? p.id.slice(-8) : 'N/A'}</span> },
    { key: 'plan', header: 'Plan', render: (p: Purchase) => <span className="font-medium text-tb-navy">{p.plan}</span> },
    { key: 'date', header: 'Date', className: 'hidden sm:table-cell', render: (p: Purchase) => <span className="text-tb-gray-500">{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span> },
    { key: 'amount', header: 'Amount', className: 'text-right', render: (p: Purchase) => <span className="font-bold text-tb-navy">{p.amount}</span> },
    { key: 'status', header: 'Status', className: 'text-center', render: (p: Purchase) => <Badge variant={p.status === 'completed' || p.status === 'Active' ? 'success' : 'primary'}>{p.status}</Badge> },
  ];

  return (
    <Card title="Purchase History">
      <div className="mt-4">
        <Table columns={columns} data={purchases} keyExtractor={(p: Purchase) => p.id} className="border-0 bg-transparent shadow-none rounded-none" />
      </div>
      {purchases.length === 0 && <p className="text-center text-tb-gray-500 py-8">No purchases yet.</p>}
    </Card>
  );
};

export default PurchasesHistoryTable;
