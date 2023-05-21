const Square = ({ value, onClick, isWinningSquares }) => {
    const colorClassName = value == 'X' ? 'text-green' : 'text-orange';
    const winningClassName = isWinningSquares ? 'winning' : '';
    return (
        <button type="button" className={`square ${colorClassName} ${winningClassName}`} onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;