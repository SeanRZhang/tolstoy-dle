import React, {useContext} from 'react';
import { AppContext } from '../App';

function Letter({letterPosition, attemptVal}) {
    const {board} = useContext(AppContext);
    const letter = board[attemptVal][letterPosition];
    return (
        <div className="letter">{letter}</div>
    )
}

export default Letter