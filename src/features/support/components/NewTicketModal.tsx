import React from 'react';
import { Modal, Input, Textarea, Button } from '@shared/components';
import { Send } from '@shared/icons';

const categoryOptions = [
  { value: 'technical', label: 'Technical' },
  { value: 'billing', label: 'Billing' },
  { value: 'account', label: 'Account' },
  { value: 'general', label: 'General' },
  { value: 'other', label: 'Other' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: { subject: string; description: string; category: string; priority: string };
  onTicketChange: (t: { subject: string; description: string; category: string; priority: string }) => void;
  errors: Record<string, string>;
  loading: boolean;
  onSubmit: () => void;
}

const NewTicketModal: React.FC<NewTicketModalProps> = ({ isOpen, onClose, ticket, onTicketChange, errors, loading, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} title="Create New Ticket" onClose={onClose} size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} isLoading={loading}><Send className="w-4 h-4" /> Submit</Button>
        </>
      }>
      <div className="space-y-4">
        <Input label="Subject" placeholder="Brief summary of your issue" value={ticket.subject}
          onChange={(e) => onTicketChange({ ...ticket, subject: e.target.value })} error={errors.subject} required />
        <Textarea label="Description" placeholder="Describe your issue in detail" rows={4} value={ticket.description}
          onChange={(e) => onTicketChange({ ...ticket, description: e.target.value })} error={errors.description} required />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Category</label>
            <select value={ticket.category} onChange={(e) => onTicketChange({ ...ticket, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {categoryOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Priority</label>
            <select value={ticket.priority} onChange={(e) => onTicketChange({ ...ticket, priority: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {priorityOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewTicketModal;
