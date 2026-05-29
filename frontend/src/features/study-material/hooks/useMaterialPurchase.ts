import { useState, useCallback } from 'react';
import { useAppDispatch } from '@store/hooks';
import {
  purchaseMaterial,
  verifyMaterialPurchase,
  fetchMaterialDetail,
} from '../store/study-material.slice';

export const useMaterialPurchase = (material: any) => {
  const dispatch = useAppDispatch();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [paymentUtr, setPaymentUtr] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [buying, setBuying] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  const resetPaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    setPendingOrder(null);
    setPaymentUtr('');
    setPaymentError('');
    setPaymentSuccess('');
  }, []);

  const handleBuy = useCallback(async () => {
    if (!material) return;
    setBuying(true);
    setPaymentError('');
    setPaymentSuccess('');
    try {
      const order = await dispatch(purchaseMaterial({ materialId: material.id, paymentMethod })).unwrap();
      if (order?.isPurchased) {
        resetPaymentModal();
        dispatch(fetchMaterialDetail(material.id));
      } else {
        setPendingOrder(order);
        setPaymentUtr('');
      }
    } catch (error: any) {
      setPaymentError(typeof error === 'string' ? error : 'Unable to create payment order');
    } finally {
      setBuying(false);
    }
  }, [dispatch, material, paymentMethod, resetPaymentModal]);

  const handleVerifyPayment = useCallback(async () => {
    if (!pendingOrder?.orderId || !material) return;
    setVerifyingPayment(true);
    setPaymentError('');
    setPaymentSuccess('');
    try {
      await dispatch(verifyMaterialPurchase({ orderId: pendingOrder.orderId, materialId: material.id, utr: paymentUtr })).unwrap();
      setPaymentSuccess('Payment verified. PDF unlocked now.');
      dispatch(fetchMaterialDetail(material.id));
      setTimeout(resetPaymentModal, 900);
    } catch (error: any) {
      setPaymentError(typeof error === 'string' ? error : 'Payment verification failed');
    } finally {
      setVerifyingPayment(false);
    }
  }, [dispatch, material, pendingOrder, paymentUtr, resetPaymentModal]);

  const handlePdfDownload = useCallback(() => {
    if (!material?.pdfUrl) return;
    if (!material.isPurchased) {
      setShowPaymentModal(true);
      return;
    }
    setShowPdfModal(true);
  }, [material]);

  return {
    showPaymentModal, showPdfModal, paymentMethod, pendingOrder, paymentUtr,
    paymentError, paymentSuccess, buying, verifyingPayment,
    setShowPaymentModal, setShowPdfModal, setPaymentMethod,
    setPaymentUtr, setPaymentError, setPaymentSuccess,
    handleBuy, handleVerifyPayment, handlePdfDownload, resetPaymentModal,
  };
};
