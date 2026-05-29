import apiClient from '@shared/utils/apiClient';
import { ITicket, ITicketDetail } from '../types';

const normalizeMessage = (message: any) => {
  if (!message || typeof message !== 'object') return null;

  return {
    sender: message.sender === 'admin' ? 'admin' : 'user',
    message: typeof message.message === 'string' ? message.message : '',
    createdAt: message.createdAt || new Date().toISOString(),
  };
};

const normalizeTicket = (ticket: any): ITicketDetail => {
  const messages = Array.isArray(ticket?.messages)
    ? ticket.messages.map(normalizeMessage).filter(Boolean)
    : [];

  return {
    ...ticket,
    id: String(ticket?.id || ticket?._id || ''),
    _id: ticket?._id,
    subject: ticket?.subject || 'Support ticket',
    category: ticket?.category || 'general',
    priority: ticket?.priority || 'medium',
    status: ticket?.status || 'open',
    createdAt: ticket?.createdAt || new Date().toISOString(),
    messages,
    messageCount: typeof ticket?.messageCount === 'number' ? ticket.messageCount : messages.length,
  };
};

const normalizeTicketSummary = (ticket: any): ITicket => {
  const normalized = normalizeTicket(ticket);
  return {
    id: normalized.id,
    _id: normalized._id,
    subject: normalized.subject,
    category: normalized.category,
    priority: normalized.priority,
    status: normalized.status,
    messageCount: normalized.messageCount,
    createdAt: normalized.createdAt,
  };
};

export const fetchFAQs = async () => {
  const response = await apiClient.get('/faqs');
  return response.data.data;
};

export const fetchMyTickets = async (params: { page?: number; limit?: number }) => {
  const response = await apiClient.get('/tickets', { params });
  const data = response.data.data;
  return {
    ...data,
    tickets: Array.isArray(data?.tickets) ? data.tickets.map(normalizeTicketSummary) : [],
  };
};

export const createTicket = async (payload: { subject: string; description: string; category: string; priority: string }) => {
  const response = await apiClient.post('/tickets', payload);
  return normalizeTicketSummary(response.data.data);
};

export const fetchTicketDetail = async (id: string) => {
  const response = await apiClient.get(`/tickets/${id}`);
  return normalizeTicket(response.data.data);
};

export const replyToTicket = async (id: string, message: string) => {
  const response = await apiClient.post(`/tickets/${id}/reply`, { message });
  return normalizeTicket(response.data.data);
};
