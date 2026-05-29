import React from 'react';
import { Card, Badge, Textarea, Button, Loader } from '@shared/components';
import { MessageSquare, Clock, ChevronDown, ChevronRight, Send } from '@shared/icons';

const priorityBadgeVariant: Record<string, 'primary' | 'warning' | 'danger' | 'success'> = { low: 'success', medium: 'primary', high: 'warning', urgent: 'danger' };
const statusBadgeVariant: Record<string, 'primary' | 'success' | 'warning' | 'danger'> = { open: 'primary', in_progress: 'warning', resolved: 'success', closed: 'danger' };

interface TicketListProps {
  tickets: any[];
  loading: boolean;
  expandedTicket: string | null;
  ticketDetail: any;
  replyText: string;
  onTicketClick: (id: string) => void;
  onReplyTextChange: (text: string) => void;
  onReply: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, loading, expandedTicket, ticketDetail, replyText, onTicketClick, onReplyTextChange, onReply, currentPage, totalPages, onPageChange, formatDate, formatTime }) => {
  return (
    <div className="space-y-4">
      {loading && tickets.length === 0 ? (
        <div className="flex items-center justify-center py-16"><Loader size="lg" label="Loading tickets..." /></div>
      ) : tickets.length > 0 ? (
        <>
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const ticketId = ticket.id || ticket._id;
              const messages = Array.isArray(ticketDetail?.messages)
                ? ticketDetail.messages.filter((msg: any) => msg && typeof msg === 'object')
                : [];

              return (
              <Card key={ticketId} className="p-0 overflow-hidden">
                <button onClick={() => onTicketClick(ticketId)} className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-tb-navy">{ticket.subject}</span>
                      <Badge variant={statusBadgeVariant[ticket.status]}>{ticket.status.replace('_', ' ')}</Badge>
                      <Badge variant={priorityBadgeVariant[ticket.priority]}>{ticket.priority}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-tb-gray-500">
                      <span>{ticket.category}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{ticket.messageCount}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(ticket.createdAt)}</span>
                    </div>
                  </div>
                  {expandedTicket === ticketId ? <ChevronDown className="w-5 h-5 text-tb-gray-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-tb-gray-400 flex-shrink-0" />}
                </button>

                {expandedTicket === ticketId && (
                  <div className="border-t border-gray-100">
                    {loading && !ticketDetail ? (
                      <div className="flex items-center justify-center py-8"><Loader size="md" label="Loading ticket..." /></div>
                    ) : ticketDetail ? (
                      <div className="p-4 space-y-4">
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {messages.map((msg: any, idx: number) => {
                            const isUser = msg.sender === 'user';
                            return (
                            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${isUser ? 'bg-tb-blue text-white rounded-br-none' : 'bg-gray-100 text-tb-gray-800 rounded-bl-none'}`}>
                                <p className="whitespace-pre-wrap">{String(msg.message || '')}</p>
                                <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-tb-gray-400'}`}>{formatTime(msg.createdAt)}</p>
                              </div>
                            </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-2">
                          <Textarea placeholder="Type your reply..." value={replyText}
                            onChange={(e) => onReplyTextChange(e.target.value)} className="min-h-[60px]" rows={2} />
                          <Button variant="primary" size="sm" onClick={onReply} disabled={!replyText.trim() || loading} className="self-end">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </Card>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => onPageChange(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === page ? 'bg-tb-blue text-white' : 'bg-white text-tb-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <Card className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-tb-navy">No tickets yet</h3>
          <p className="text-sm text-tb-gray-500 mt-1">Create a ticket to get support</p>
        </Card>
      )}
    </div>
  );
};

export default TicketList;
