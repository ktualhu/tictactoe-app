import { Message } from '../../utils/types/chat-message';

export default interface ChatState {
  // roomId: string;
  messages: Message[];
}
