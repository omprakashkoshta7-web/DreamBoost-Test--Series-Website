import React from 'react';
import { Card, Loader, EmptyState } from '@shared/components';
import { HelpCircle, ChevronDown, ChevronRight } from '@shared/icons';

interface FaqListProps {
  faqs: any[];
  loading: boolean;
  faqCategoryFilter: string;
  onCategoryChange: (cat: string) => void;
  faqCategories: string[];
  expandedFaq: string | null;
  onFaqToggle: (id: string) => void;
}

const FaqList: React.FC<FaqListProps> = ({ faqs, loading, faqCategoryFilter, onCategoryChange, faqCategories, expandedFaq, onFaqToggle }) => {
  const filteredFaqs = faqCategoryFilter === 'all' ? faqs : faqs.filter((f) => f.category === faqCategoryFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {faqCategories.map((cat) => (
          <button key={cat} onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${faqCategoryFilter === cat ? 'bg-tb-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {loading && faqs.length === 0 ? (
        <div className="flex items-center justify-center py-16"><Loader size="sm" /></div>
      ) : filteredFaqs.length > 0 ? (
        <div className="space-y-2">
          {filteredFaqs.map((faq) => (
            <Card key={faq._id} className="p-0 overflow-hidden">
              <button onClick={() => onFaqToggle(faq._id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-tb-navy">{faq.question}</span>
                {expandedFaq === faq._id ? <ChevronDown className="w-5 h-5 text-tb-gray-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-tb-gray-400 flex-shrink-0" />}
              </button>
              {expandedFaq === faq._id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="mt-3 text-sm text-tb-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={<HelpCircle className="w-12 h-12 text-tb-gray-300" />} title="No FAQs found" />
      )}
    </div>
  );
};

export default FaqList;
