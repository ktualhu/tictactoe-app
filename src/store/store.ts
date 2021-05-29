import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import roomsReducer from './rooms/roomsSlice';

const reducers = {
  users: usersReducer,
  rooms: roomsReducer,
};

export default configureStore({ reducer: reducers });
