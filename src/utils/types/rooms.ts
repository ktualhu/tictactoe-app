// import { User } from './users';

import { User } from './users';

export interface Room {
  roomId: string;
  roomTitle: string;
  roomPrivate: boolean;
  roomUsers: User[];
  roomPassword?: string;
}
