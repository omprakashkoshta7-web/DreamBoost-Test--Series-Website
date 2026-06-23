import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from '@shared/components';
import { ArrowLeft, Bookmark, CheckCircle, Crown, Share2, Sparkles, Star } from '@shared/icons';
import ContentTab from '../components/ContentTab';
import MaterialHeader from '../components/MaterialHeader';
import {
  LockedMaterialCard,
  MaterialPaymentModal,
  PdfDownloadModal,
} from '../components/MaterialPurchasePanels';
import MaterialTabs from '../components/MaterialTabs';
import OverviewTab from '../components/OverviewTab';
import ResourcesTab from '../components/ResourcesTab';
import { useMaterialDetail } from '../hooks';
import SEO from '@shared/components/SEO';

type TabType = 'overview' | 'content' | 'resources';
const PDF_DOWNLOAD_PRICE = 39;

const PLAN_META: Record<string, { label: string; icon: any; color: string; features: string[] }> = {
  basic: {
    label: 'Basic',
    icon: Star,
    color: 'from-blue-500 to-blue-700',
    features: ['Full content access', 'Download and read offline', 'Unlimited views, no expiry', 'Basic support'],
  },
  standard: {
    label: 'Standard',
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-700',
    features: ['Full content access', 'Download and read offline', 'Unlimited views, no expiry', 'Priority support', 'Printable format'],
  },
  premium: {
    label: 'Premium',
    icon: Crown,
    color: 'from-amber-500 to-orange-600',
    features: ['Full content access', 'Download and read offline', 'Unlimited views, no expiry', 'Premium support', 'Printable format', 'Additional practice questions'],
  },
};

const tabs = [
  { key: 'overview' as TabType, label: 'Overview' },
  { key: 'content' as TabType, label: 'Content' },
  { key: 'resources' as TabType, label: 'Resources' },
];

const MaterialViewPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const {
    material, loading, markedComplete,
    showPaymentModal, showPdfModal, paymentMethod, pendingOrder, paymentUtr,
    paymentError, paymentSuccess, buying, verifyingPayment,
    setShowPaymentModal, setShowPdfModal, setPaymentMethod, setPaymentUtr,
    handleBookmark, handleMarkComplete, handleBuy, handleVerifyPayment,
    handlePdfDownload, resetPaymentModal,
  } = useMaterialDetail(materialId);

  if (loading || !material) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  const rawPricing = material.pricing || { plan: 'free', price: 0, originalPrice: 0 };
  const pricing = material.pdfUrl
    ? { ...rawPricing, plan: rawPricing.plan === 'free' ? 'basic' : rawPricing.plan, price: PDF_DOWNLOAD_PRICE, originalPrice: rawPricing.originalPrice > PDF_DOWNLOAD_PRICE ? rawPricing.originalPrice : PDF_DOWNLOAD_PRICE }
    : rawPricing;
  const planMeta = PLAN_META[pricing.plan] || PLAN_META.basic;
  const PlanIcon = planMeta.icon;
  const isLocked = material.isLocked && !material.isPurchased;
  const discount = pricing.originalPrice > pricing.price ? Math.round(((pricing.originalPrice - pricing.price) / pricing.originalPrice) * 100) : 0;

  const paymentModal = (
    <MaterialPaymentModal
      isOpen={showPaymentModal}
      material={material}
      pricing={pricing}
      planMeta={planMeta}
      PlanIcon={PlanIcon}
      discount={discount}
      paymentMethod={paymentMethod}
      pendingOrder={pendingOrder}
      paymentUtr={paymentUtr}
      paymentError={paymentError}
      paymentSuccess={paymentSuccess}
      buying={buying}
      verifyingPayment={verifyingPayment}
      onClose={resetPaymentModal}
      onPaymentMethodChange={setPaymentMethod}
      onPaymentUtrChange={setPaymentUtr}
      onBuy={handleBuy}
      onVerifyPayment={handleVerifyPayment}
    />
  );

  if (isLocked) {
    return (
      <>
        <LockedMaterialCard
          material={material}
          pricing={pricing}
          planMeta={planMeta}
          discount={discount}
          buying={buying}
          onBuyClick={() => setShowPaymentModal(true)}
        />
        {paymentModal}
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <SEO title="Study Material" noIndex />
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4" /> Back</Button>
        <div className="flex items-center gap-2">
          <button onClick={handleBookmark} className={`p-2 rounded-lg transition-all ${material.progress?.isBookmarked ? 'bg-tb-orange/10 text-tb-orange' : 'text-tb-gray-400 hover:bg-tb-gray-100'}`} title="Bookmark">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-tb-gray-400 hover:bg-tb-gray-100" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MaterialHeader material={material} markedComplete={markedComplete} onMarkComplete={handleMarkComplete} />
      <MaterialTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && <OverviewTab material={material} />}
      {activeTab === 'content' && <ContentTab material={material} markedComplete={markedComplete} onMarkComplete={handleMarkComplete} onDownloadPdf={handlePdfDownload} />}
      {activeTab === 'resources' && <ResourcesTab material={material} onDownloadPdf={handlePdfDownload} />}

      <div className="sticky bottom-4 bg-white border border-tb-gray-200 rounded-2xl p-3 shadow-lg flex items-center justify-between gap-3">
        <button onClick={handleBookmark} className={`p-2 rounded-lg transition-all ${material.progress?.isBookmarked ? 'text-tb-orange' : 'text-tb-gray-400 hover:text-tb-orange'}`}>
          <Bookmark className="w-5 h-5" />
        </button>
        <Button onClick={handleMarkComplete} size="sm">
          <CheckCircle className="w-4 h-4" />{markedComplete ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>

      {paymentModal}
      <PdfDownloadModal isOpen={showPdfModal} material={material} onClose={() => setShowPdfModal(false)} />
    </div>
  );
};

export default MaterialViewPage;
