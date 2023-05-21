import React from 'react'
const StatusMessage = ({ winner, isXNext, squares }) => {
    const noMovesLeft = squares.every(squareValue => squareValue !== null);
    const nextPlayer = isXNext ? 'X' : 'O';

    const renderStatusMessage = () => {
        if (winner) {
            return <>Winner is <span className={isXNext ? 'text-orange' : 'text-green'}>{winner}</span>.</>;
        }
        if (!winner && noMovesLeft) {
            return <><span className="text-orange">O</span> and <span className="text-green">X</span> tied.</>;
        }
        if (!winner && !noMovesLeft) {
            return <>Next player is <span className={isXNext ? 'text-green' : 'text-orange'}>{nextPlayer}</span>.</>;
        }
        return null;
    }

    return <h2 className="status-message">{renderStatusMessage()}</h2>;
}
export default StatusMessage;