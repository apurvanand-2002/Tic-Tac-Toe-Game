import './styles.scss'
import { useState } from 'react'
import Board from "./components/Board"
import { calculateWinner } from './winner'
import StatusMessage from './components/StatusMessage'
import History from './components/History'

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), isXNest: false }]);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);
  console.log({ history, currentMove });

  const handleSquareClick = (clickedPosition) => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = isTraversing ? currentHistory[currentMove] : currentHistory[currentHistory.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            // console.log('HERE IT IS________________', lastGamingState.isXNext ? 'X' : 'O');
            return lastGamingState.isXNext ? 'X' : 'O';
          }

          return squareValue;
        });
      return currentHistory.concat({
        squares: nextSquaresState, isXNext: !lastGamingState.isXNext
      });
    });
    setCurrentMove(currentMove => currentMove + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  }

  return (
    <div className='app'>
      <h1><span className="text-orange">Apurv's</span> <span className="text-green">Tic</span>-<span className="text-orange">Tac</span>-<span className="text-green">Toe</span>-<span className="text-orange">Game</span></h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />

      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} />

      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>);
}

export default App;
