import { useEffect, useState } from 'react';

const useTimer = (time: number, onTimesOut: () => void) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    time !== -1 && handleTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleTimer = () => {
    setTimeout(() => {
      console.log(timer);

      timer > 0 ? setTimer(timer - 1) : onTimesOut();
    }, 1000);
  };

  const getTimer = () => {
    return timer;
  };

  return { getTimer };
};

export default useTimer;
