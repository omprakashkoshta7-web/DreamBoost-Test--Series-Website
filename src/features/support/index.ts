export { default as SupportPage } from './pages/SupportPage';
export { default as supportReducer } from './store/support.slice';
export { fetchFAQs, fetchMyTickets, createTicket, fetchTicketDetail, replyToTicket } from './store/support.thunks';
export { selectFAQs, selectTickets, selectTicketDetail, selectSupportTotalTickets, selectSupportLoading } from './store/support.selectors';
export type { ITicket, ITicketDetail, IFaq } from './types';
