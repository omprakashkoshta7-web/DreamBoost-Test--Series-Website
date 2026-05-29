import apiClient from '@shared/utils/apiClient';

interface ChatMessage {
  _id: string;
  role: 'user' | 'bot';
  message: string;
  createdAt: string;
}

interface SendMessageResponse {
  userMessage: ChatMessage;
  botMessage: ChatMessage;
}

export const sendMessage = async (message: string): Promise<SendMessageResponse> => {
  const res = await apiClient.post('/chat/message', { message });
  return res.data.data;
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const res = await apiClient.get('/chat/history');
  return res.data.data;
};
