import './styles.scss'
import { useState } from 'react'
import Board from "./components/Board"
import { calculateWinner } from './winner'
import StatusMessage from './components/StatusMessage'
import History from './components/History'


const NEW_GAME = [{ squares: Array(9).fill(null), isXNest: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);
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
      const base = isTraversing ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1) : currentHistory;

      return base.concat({
        squares: nextSquaresState, isXNext: !lastGamingState.isXNext
      });
    });
    setCurrentMove(currentMove => currentMove + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  }

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  }
  return (
    <div className='app'>
      <h1><span className="text-orange">Apurv's</span> <span className="text-green">Tic</span>-<span className="text-orange">Tac</span>-<span className="text-green">Toe</span>-<span className="text-orange">Game</span></h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />

      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} winningSquares={winningSquares} />

      <button type='button' onClick={onNewGameStart} className={
        `btn-reset ${winner ? 'active' : ''}`
      }>Start new game</button>

      <h2 style={{
        fontWeight: 'normal'
      }}>Current game history:</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div >);
}

export default App;
