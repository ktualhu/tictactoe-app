import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStateType } from '../../utils/types/game';
import GameState from '../state/gameState';
import RootState from '../state/rootState';

const initialState: GameState = {
  gameState: GameStateType.WAIT,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameStateType: (state, action: PayloadAction<GameStateType>) => {
      state.gameState = action.payload;
    },
  },
});

export const { changeGameStateType } = gameSlice.actions;

export const gameStateTypeSelector = (state: RootState) => state.game.gameState;

export default gameSlice.reducer;
