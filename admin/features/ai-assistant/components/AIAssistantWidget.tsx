import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, X, Send, User, Loader2 } from '@shared/icons';
import { sendAIChat } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'Show dashboard stats',
  'List all categories',
  'Create a new subject under SSC',
  'How many users are there?',
];

const AIAssistantWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || sending) return;
    setInput('');
    setSending(true);
    const userMsg: Message = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    try {
      const res = await sendAIChat(msg, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setSending(false);
    }
  }, [input, sending, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-4 right-4 z-50 flex w-[380px] flex-col rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] animate-slide-up origin-bottom-right"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-tb-navy px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Assistant</p>
                <p className="text-[11px] text-white/70">Admin helper</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-white/15 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 bg-gray-50/50" style={{ minHeight: 300, maxHeight: 420 }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-tb-navy/10 to-blue-100">
                  <Sparkles className="h-7 w-7 text-tb-navy" />
                </div>
                <p className="text-sm font-semibold text-tb-navy">How can I help you admin?</p>
                <p className="mt-1 text-xs text-tb-gray-400 max-w-[260px]">I can manage categories, exams, subjects, topics, tests, questions, and more.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-tb-navy shadow-sm ring-1 ring-tb-navy/20 transition-all hover:bg-tb-navy hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[88%] gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-tb-navy text-white' : 'bg-white text-tb-gray-400 shadow-sm ring-1 ring-gray-200'}`}>
                      {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-tb-navy text-white' : 'bg-white text-tb-navy ring-1 ring-gray-100'}`}>
                      {msg.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div className="flex justify-start">
                <div className="flex max-w-[88%] gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-tb-gray-400 shadow-sm ring-1 ring-gray-200">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-gray-100">
                    <Loader2 className="h-4 w-4 animate-spin text-tb-navy" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3 rounded-b-2xl">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl bg-gray-50 px-4 py-2.5 text-sm outline-none ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-tb-navy/40 transition-all placeholder:text-gray-400"
              disabled={sending}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || sending}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-tb-navy text-white shadow-sm transition-all hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-tb-navy text-white shadow-[0_4px_20px_rgba(15,23,42,0.4)] transition-all hover:scale-110 hover:shadow-[0_6px_28px_rgba(15,23,42,0.5)] active:scale-95"
        >
          {open ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <>
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
              <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <span className="text-[7px] sm:text-[8px] font-bold text-white">AI</span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default AIAssistantWidget;
