import { RootState } from '@store/store';

export const selectTickets = (state: RootState) => state.support.tickets;
export const selectTicketDetail = (state: RootState) => state.support.ticketDetail;
export const selectFAQs = (state: RootState) => state.support.faqs;
export const selectSupportTotalPages = (state: RootState) => state.support.totalPages;
export const selectSupportCurrentPage = (state: RootState) => state.support.currentPage;
export const selectSupportTotalTickets = (state: RootState) => state.support.totalTickets;
export const selectSupportLoading = (state: RootState) => state.support.loading;
export const selectSupportError = (state: RootState) => state.support.error;
