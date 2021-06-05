import { useEffect, useState } from 'react';
import { useGameLogic } from './GameLogic';
import styles from './Game.module.css';
import GamePreview from './GamePreview/GamePreview';
import GameField from './GameField/GameField';

function Game() {
  const [disabled, setDisabled] = useState(false);
  const [started, setStarted] = useState({ isStarted: false, figure: '' });
  const gameLogic = useGameLogic();

  useEffect(() => {
    gameLogic.init(document.querySelectorAll('.cell'), started.figure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const handleCellClick: React.MouseEventHandler<HTMLTableElement> = event => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.classList.contains('cell')) return;
    const el = gameLogic.fillCell(event.target)!;
    renderButtonText(el);
    if (gameLogic.checkWinner()) {
      paintWinner(gameLogic.getWinStrick());
    }
  };

  const handleGameStart = (figure: string) => {
    setStarted({ isStarted: true, figure });
  };

  const paintWinner = (winCells: number[]) => {
    setDisabled(true);
    winCells.forEach(cellNum => {
      document
        .querySelectorAll('.cell')
        [cellNum].firstElementChild?.classList.add(styles.winner);
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

  if (started.isStarted) {
    return <GameField handleCellClick={handleCellClick} disabled={disabled} />;
  }
  return <GamePreview handleGameStart={handleGameStart} />;
}

export default Game;
