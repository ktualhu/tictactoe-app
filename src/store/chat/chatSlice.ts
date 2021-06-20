import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../utils/types/chat-message';
import ChatState from '../state/chatState';
import RootState from '../state/rootState';

const initialState: ChatState = {
  // roomId: '',
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatAlert: (state, action: PayloadAction<Message>) => {
      // state.roomId = action.payload.roomId;
      state.messages.push(action.payload);
    },
    leaveChatAlert: state => {
      // state.roomId = '';
      state.messages = [];
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { chatAlert, leaveChatAlert, addMessage } = chatSlice.actions;

export const getAllMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
