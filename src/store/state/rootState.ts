import ChatState from './chatState';
import RoomsState from './roomState';
import UsersState from './usersState';

export default interface RootState {
  users: UsersState;
  rooms: RoomsState;
  chat: ChatState;
}
