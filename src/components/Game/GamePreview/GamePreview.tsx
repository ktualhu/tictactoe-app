import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import getAllPossibleChars from '../../../utils/helpers/possibleChars';
import { GamePreviewState } from '../../../utils/types/game';
import GamePickFigure from './GamePickFigure';
import GameShowFigure from './GameShowFigure';
import GameWait from './GameWait';

type GamePreviewProps = {
  handleGameStart: (figure: string) => void;
  curState: GamePreviewState;
  waitReason: string;
};

function GamePreview(props: GamePreviewProps) {
  const [figure, setFigure] = useState('');
  const [previewState, setPreviewState] = useState({} as GamePreviewState);

  useEffect(() => {
    setPreviewState(props.curState);
  }, [props.curState]);

  const onTimesOut = (state: GamePreviewState) => {
    switch (state) {
      case GamePreviewState.PICK:
        setPreviewState(GamePreviewState.WAIT);
        break;
      case GamePreviewState.WAIT:
        pickRandomFigure();
        setPreviewState(GamePreviewState.SHOW);
        break;
    }
  };

  const pickRandomFigure = () => {
    const chars = getAllPossibleChars();
    const randN = Math.round(Math.random() * chars.length);
    setFigure(chars[randN].toUpperCase());
  };

  const renderCurrentGamePreviewState = () => {
    switch (previewState) {
      case GamePreviewState.PICK:
        return (
          <GamePickFigure
            handleGameStart={props.handleGameStart}
            onTimesOut={state => onTimesOut(state)}
          />
        );

      case GamePreviewState.WAIT:
        return (
          <GameWait
            simulated={!!props.waitReason || false}
            reason={props.waitReason || 'Picking figure for you..'}
            onTimesOut={state => onTimesOut(state)}
          />
        );
      case GamePreviewState.SHOW:
        return <GameShowFigure figure={figure} />;
    }
  };

  return (
    <Container className="d-flex align-items-center" style={{ height: '100%' }}>
      {renderCurrentGamePreviewState()}
    </Container>
  );
}

export default GamePreview;
