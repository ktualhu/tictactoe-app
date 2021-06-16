export const GAME_PICKING_FIGURE_NOTIFY = 'Picking figure for you...';
export const GAME_GOFIRST_INFO_NOTIFY = 'Decide who`ll go first...';
export const GAME_CHECKING_FOR_GAME = 'Checking for game in this room...';
export const GAME_WAITING_FOR_PLAYER_CONNECT = 'Waiting for one more player...';
export const GAME_WAITING_FOR_PLAYER_READY = 'Waiting for player is ready...';
export const GAME_WAITING_FOR_PLAYER_PICK =
  'Waiting while player is picking figure...';

export enum GameStateType {
  PREVIEW = 'preview',
  WAIT = 'wait',
  CHOOSE = 'choose',
  RESTART = 'restart',
  PLAY = 'play',
  OVER = 'over',
}

export enum GamePreviewState {
  PICK = 'pick',
  WAIT = 'wait',
  WAIT_PICK = 'wait_pick',
  SHOW = 'show',
}

export enum GameReadyState {
  NOT_READY = 'not_ready',
  READY = 'ready',
  PLAY = 'play',
}

export enum GamePickState {
  NOONE = 'noone',
  ONE = 'one',
  ALL = 'all',
}

export interface Game {
  id: string;
  players: GameUser[];
  readyPlayers: string[];
  gameState: GameStateType;
  gameReadyState: GameReadyState;
  gamePickState: GamePickState;
}

export class GameUser {
  username: string = '';
  figure?: string = '';
  goFirst?: boolean = false;
}

export interface GameAction {
  roomId: string;
  username: string;
  figure?: string;
  goFirst?: boolean;
}
