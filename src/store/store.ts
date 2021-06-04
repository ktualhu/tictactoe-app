import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import roomsReducer from './rooms/roomsSlice';
import chatReducer from './chat/chatSlice';

const reducers = {
  users: usersReducer,
  rooms: roomsReducer,
  chat: chatReducer,
};

export default configureStore({ reducer: reducers });
