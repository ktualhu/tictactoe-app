import { useEffect, useRef, useState } from 'react';
import { useGameLogic } from './GameLogic';
import styles from './Game.module.css';
import GamePreview from './GamePreview/GamePreview';
import GameField from './GameField/GameField';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeGameStateType,
  gameStateSelector,
} from '../../store/game/gameSlice';
import { GameStateType } from '../../utils/types/game';
import { currentUserSelector } from '../../store/users/usersSlice';
import { useGame } from '../../hooks/useGame';

type GameProps = {
  roomId: string;
  playersCounter: number;
};

function Game(props: GameProps) {
  const [started, setStarted] = useState({ isStarted: false, figure: '' });
  const currentUser = useSelector(currentUserSelector);
  const gameState = useSelector(gameStateSelector);
  const gameLogic = useGameLogic();
  const dispatch = useDispatch();

  const cellsRef = useRef({} as NodeListOf<Element>);
  const game = useGame({
    roomId: props.roomId,
    username: currentUser.username,
  });

  useEffect(() => {
    game.gameJoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cellsRef.current = document.querySelectorAll('.cell');
    gameLogic.init(cellsRef.current, started.figure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const handleCellClick: React.MouseEventHandler<HTMLTableElement> = event => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.classList.contains('cell')) return;
    const el = gameLogic.fillCell(event.target);
    if (!el) return;
    el.classList.add(styles.cannotuse);
    renderButtonText(el);
    if (gameLogic.checkWinner()) {
      handleGameOver();
    }
  };

  const handleGameStart = (figure: string) => {
    dispatch(changeGameStateType(GameStateType.PLAY));
    setStarted({ isStarted: true, figure });
  };

  const handleGameRestart = () => {
    gameLogic.init(cellsRef.current, started.figure);
    dispatch(changeGameStateType(GameStateType.PLAY));
    cellsRef.current.forEach(cell => cell.classList.remove(styles.cannotuse));
  };

  const handleGameOver = () => {
    dispatch(changeGameStateType(GameStateType.OVER));
    cellsRef.current.forEach(cell => cell.classList.add(styles.cannotuse));
    paintWinner(gameLogic.getWinStrick());
  };

  const paintWinner = (winCells: number[]) => {
    winCells.forEach(cellNum => {
      cellsRef.current[cellNum].firstElementChild?.classList.add(styles.winner);
    });
  };

  const renderButtonText = (el: Element) => {
    const h1 = document.createElement('h1');
    h1.setAttribute('className', 'display-3');
    h1.textContent = el.textContent;
    el.textContent = '';
    document
      .getElementById(`${el.id}`)
      ?.insertAdjacentElement('afterbegin', h1);
  };

  switch (gameState) {
    case GameStateType.RESTART:
    case GameStateType.PLAY:
    case GameStateType.OVER:
      gameState === GameStateType.RESTART && handleGameRestart();
      return <GameField handleCellClick={handleCellClick} />;
    default:
      return (
        <GamePreview
          roomId={props.roomId}
          handleGameStart={handleGameStart}
          players={props.playersCounter}
        />
      );
  }
}

export default Game;
