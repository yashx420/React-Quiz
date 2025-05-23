import React, { useEffect } from 'react';

export default function Timer({ dispatch, secondsLeft }) {
  const mins = Math.floor(secondsLeft/60);
  const seconds = secondsLeft % 60;

  useEffect(function () {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div>
      <div className='timer'>{mins}:{seconds < 10 ? `0${seconds}` : seconds}</div>
    </div>
  );
}
