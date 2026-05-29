import { createSlice } from '@reduxjs/toolkit';
import { ITicket, ITicketDetail, IFaq } from '../types';
import {
  fetchFAQs,
  fetchMyTickets,
  createTicket,
  fetchTicketDetail,
  replyToTicket,
} from './support.thunks';

interface SupportState {
  tickets: ITicket[];
  ticketDetail: ITicketDetail | null;
  faqs: IFaq[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
  loading: boolean;
  error: string | null;
}

const initialState: SupportState = {
  tickets: [],
  ticketDetail: null,
  faqs: [],
  totalPages: 0,
  currentPage: 1,
  totalTickets: 0,
  loading: false,
  error: null,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    clearTicketDetail: (state) => {
      state.ticketDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload.faqs;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalTickets = action.payload.totalTickets;
      })
      .addCase(fetchMyTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
        state.totalTickets += 1;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTicketDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetail = action.payload;
      })
      .addCase(fetchTicketDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(replyToTicket.pending, (state) => {
        state.error = null;
      })
      .addCase(replyToTicket.fulfilled, (state, action) => {
        state.ticketDetail = action.payload;
        const updatedTicket = action.payload;
        const ticketId = updatedTicket?.id || updatedTicket?._id;
        const existingTicket = state.tickets.find((ticket) => ticket.id === ticketId || ticket._id === ticketId);

        if (existingTicket && updatedTicket) {
          existingTicket.status = updatedTicket.status;
          existingTicket.messageCount = updatedTicket.messageCount;
        }
      })
      .addCase(replyToTicket.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearTicketDetail } = supportSlice.actions;
export default supportSlice.reducer;
