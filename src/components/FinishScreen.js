import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

export default function FinishScreen({dispatch, points, maxPoints, highscore}) {
  return (
    <>
    <div className='result'>
        <p>You scored {points} out of {maxPoints} <strong>({Math.ceil((points*100)/maxPoints)}%</strong>)</p>
    </div>
    <p className='highscore'>Highscore: {highscore} points</p>
    <button className='btn btn-ui' onClick={()=>dispatch({type: "restart"})}>RESTART</button>
    </>
  );
};
