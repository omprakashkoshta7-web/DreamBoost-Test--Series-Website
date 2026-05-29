import React from 'react';
import { Smartphone } from '@shared/icons';

interface UPIPaymentQRProps {
  pendingOrder: {
    qrImageUrl: string;
    orderId: string;
    amount: number;
  };
  utr: string;
  setUtr: (value: string) => void;
}

const UPIPaymentQR: React.FC<UPIPaymentQRProps> = ({ pendingOrder, utr, setUtr }) => {
  return (
    <div className="space-y-5 mb-6">
      <div className="rounded-2xl border border-tb-gray-200 bg-tb-gray-50 p-5 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-tb-navy mb-3">
          <Smartphone className="w-4 h-4" />
          Scan QR to Pay
        </div>
        <img src={pendingOrder.qrImageUrl} alt={`Payment QR for ${pendingOrder.orderId}`} className="mx-auto h-56 w-56 rounded-xl bg-white p-3 shadow-sm" />
        <p className="mt-3 text-2xl font-black text-tb-navy">₹{pendingOrder.amount}</p>
        <p className="text-xs text-tb-gray-500">Order ID: {pendingOrder.orderId}</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-tb-navy mb-2">Pay using</p>
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-tb-gray-600">
          {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => <span key={app} className="rounded-lg bg-tb-gray-100 px-2 py-2">{app}</span>)}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-tb-gray-700 mb-2">Payment Done? Enter UTR</label>
        <input type="text" placeholder="Paste UTR / transaction reference" value={utr} onChange={e => setUtr(e.target.value)}
          className="w-full px-4 py-3 border border-tb-gray-300 rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-tb-blue focus:border-transparent transition-all" />
      </div>
    </div>
  );
};

export default UPIPaymentQR;
