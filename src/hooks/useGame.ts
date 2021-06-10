import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useGame = () => {
  const gameSocketRef = useRef({} as Socket);

  useEffect(() => {
    gameSocketRef.current = io('http://localhost:5001/game', {
      withCredentials: true,
    });

    gameSocketRef.current.on('game:pick', data => {
      console.log('on game:pick', data);
    });

    return () => {
      gameSocketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gamePickFigure = (figure: string) => {
    gameSocketRef.current.emit('game:pick', figure.toLocaleUpperCase());
  };

  return { gamePickFigure };
};
