import React from 'react';
import SEO from '@shared/components/SEO';
import { Alert, Button, Tabs } from '@shared/components';
import { HelpCircle, Mail, MessageSquare, Plus } from '@shared/icons';
import SupportPageHeader from '@features/support/components/SupportPageHeader';
import ContactSection from '../components/ContactSection';
import FaqList from '../components/FaqList';
import NewTicketModal from '../components/NewTicketModal';
import TicketList from '../components/TicketList';
import { type SupportTabKey, useSupport } from '../hooks/useSupport';

const tabs = [
  { key: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
  { key: 'tickets', label: 'My Tickets', icon: <MessageSquare className="w-4 h-4" /> },
  { key: 'contact', label: 'Contact Us', icon: <Mail className="w-4 h-4" /> },
];

const SupportPage: React.FC = () => {
  const support = useSupport();

  return (
    <div className="space-y-6">
      <SEO title="Help &amp; Support" noIndex />
      <SupportPageHeader />

      <Tabs tabs={tabs} activeTab={support.activeTab} onChange={(key) => support.setActiveTab(key as SupportTabKey)} variant="pills" />

      {support.error && <Alert variant="danger" title="Error" onClose={() => {}}>{support.error}</Alert>}

      {support.activeTab === 'faqs' && (
        <FaqList
          faqs={support.faqs}
          loading={support.loading}
          faqCategoryFilter={support.faqCategoryFilter}
          onCategoryChange={support.handleCategoryChange}
          faqCategories={support.faqCategories}
          expandedFaq={support.expandedFaq}
          onFaqToggle={support.setExpandedFaq}
        />
      )}

      {support.activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => support.setShowNewTicketModal(true)}>
              <Plus className="w-4 h-4" /> New Ticket
            </Button>
          </div>
          <TicketList
            tickets={support.tickets}
            loading={support.loading}
            expandedTicket={support.expandedTicket}
            ticketDetail={support.ticketDetail}
            replyText={support.replyText}
            onTicketClick={support.handleTicketClick}
            onReplyTextChange={support.setReplyText}
            onReply={support.handleReply}
            currentPage={support.currentPage}
            totalPages={support.totalPages}
            onPageChange={support.handlePageChange}
            formatDate={support.formatDate}
            formatTime={support.formatTime}
          />
        </div>
      )}

      {support.activeTab === 'contact' && (
        <ContactSection
          contactForm={support.contactForm}
          onContactFormChange={support.setContactForm}
          contactSubmitted={support.contactSubmitted}
          onSubmit={support.handleContactSubmit}
        />
      )}

      <NewTicketModal
        isOpen={support.showNewTicketModal}
        onClose={() => support.setShowNewTicketModal(false)}
        ticket={support.newTicket}
        onTicketChange={support.setNewTicket}
        errors={support.newTicketErrors}
        loading={support.loading}
        onSubmit={support.handleCreateTicket}
      />
    </div>
  );
};

export default SupportPage;
