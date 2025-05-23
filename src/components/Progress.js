import React from 'react';


export default function Progress({n, index, totalPoints, points, answer}) {
  return (
    <header className='progress'>
        <progress max={n} value={index + Number(answer !== null)} />
        <p>Question <strong>{index+1}</strong> / {n}</p>
        <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  );
};


