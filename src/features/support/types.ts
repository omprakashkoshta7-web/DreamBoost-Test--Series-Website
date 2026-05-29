export interface ITicket {
  id: string;
  _id?: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messageCount: number;
  createdAt: string;
}

export interface ITicketDetail extends ITicket {
  messages: { sender: 'user' | 'admin'; message: string; createdAt: string }[];
}

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}
