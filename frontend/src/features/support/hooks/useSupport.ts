import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectFAQs,
  selectSupportCurrentPage,
  selectSupportError,
  selectSupportLoading,
  selectSupportTotalPages,
  selectTicketDetail,
  selectTickets,
} from '../store/support.selectors';
import { clearTicketDetail } from '../store/support.slice';
import {
  createTicket as createTicketThunk,
  fetchFAQs,
  fetchMyTickets,
  fetchTicketDetail,
  replyToTicket as replyToTicketThunk,
} from '../store/support.thunks';

export type SupportTabKey = 'faqs' | 'tickets' | 'contact';

const initialTicket = {
  subject: '',
  description: '',
  category: 'general',
  priority: 'medium',
};

export const useSupport = () => {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector(selectFAQs);
  const tickets = useAppSelector(selectTickets);
  const ticketDetail = useAppSelector(selectTicketDetail);
  const loading = useAppSelector(selectSupportLoading);
  const error = useAppSelector(selectSupportError);
  const totalPages = useAppSelector(selectSupportTotalPages);
  const currentPage = useAppSelector(selectSupportCurrentPage);

  const [activeTab, setActiveTab] = useState<SupportTabKey>('faqs');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('all');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [newTicket, setNewTicket] = useState(initialTicket);
  const [newTicketErrors, setNewTicketErrors] = useState<Record<string, string>>({});
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    if (activeTab === 'faqs') dispatch(fetchFAQs());
    if (activeTab === 'tickets') dispatch(fetchMyTickets({ page: 1 }));
  }, [activeTab, dispatch]);

  const faqCategories = useMemo(() => ['all', ...new Set(faqs.map((faq) => faq.category))], [faqs]);

  const handleCategoryChange = useCallback((category: string) => {
    setFaqCategoryFilter(category);
    setExpandedFaq(null);
  }, []);

  const handleTicketClick = useCallback((id: string) => {
    if (expandedTicket === id) {
      setExpandedTicket(null);
      dispatch(clearTicketDetail());
      return;
    }

    setExpandedTicket(id);
    dispatch(fetchTicketDetail(id));
  }, [dispatch, expandedTicket]);

  const handleCreateTicket = useCallback(async () => {
    const errors: Record<string, string> = {};
    if (!newTicket.subject.trim()) errors.subject = 'Subject is required';
    if (!newTicket.description.trim()) errors.description = 'Description is required';
    setNewTicketErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await dispatch(createTicketThunk(newTicket));
    setShowNewTicketModal(false);
    setNewTicket(initialTicket);
  }, [dispatch, newTicket]);

  const handleReply = useCallback(async () => {
    if (!replyText.trim() || !expandedTicket) return;
    await dispatch(replyToTicketThunk({ id: expandedTicket, message: replyText }));
    setReplyText('');
  }, [dispatch, expandedTicket, replyText]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(fetchMyTickets({ page }));
  }, [dispatch]);

  const handleContactSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    setContactSubmitted(true);
  }, []);

  const formatDate = useCallback((date: string) => (
    new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  ), []);

  const formatTime = useCallback((date: string) => (
    new Date(date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  ), []);

  return {
    activeTab,
    contactForm,
    contactSubmitted,
    currentPage,
    error,
    expandedFaq,
    expandedTicket,
    faqCategories,
    faqCategoryFilter,
    faqs,
    loading,
    newTicket,
    newTicketErrors,
    replyText,
    showNewTicketModal,
    ticketDetail,
    tickets,
    totalPages,
    formatDate,
    formatTime,
    handleCategoryChange,
    handleContactSubmit,
    handleCreateTicket,
    handlePageChange,
    handleReply,
    handleTicketClick,
    setActiveTab,
    setContactForm,
    setExpandedFaq,
    setNewTicket,
    setReplyText,
    setShowNewTicketModal,
  };
};
