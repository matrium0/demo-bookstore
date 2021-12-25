import React, {useState} from 'react';
import GameBoard from './gameboard';

const defaultState = {
  xIsNext: true,
  gameFinished: false,
  gameStatusMessage: "",
  boardHistory: [Array<string>(9).fill("")],
}

const TicTacToe = () => {
  const [appState, setAppState] = useState(defaultState);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("TicTacToe", appState);

  return (
      <div className="mt-5">
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center mt-4">

          <GameBoard currentBoardState={appState.boardHistory[appState.boardHistory.length - 1]}
                     squarePicked={(i: number) => handleSquarePicked(i)}
          />
          {errorMessage !== "" && <div className="text-danger">{errorMessage}</div>}

          {appState.boardHistory.length > 1 && !appState.gameFinished &&
              <button onClick={moveStateBack} className="mt-4 btn btn-primary">jump back</button>
          }
          <div style={{marginTop: 20}}>
            Status: {appState.gameStatusMessage}
          </div>
          <div style={{marginTop: 20}}>
            {appState.gameFinished && <button onClick={startNewGame} className="btn btn-primary">start new game</button>}
          </div>
        </div>
      </div>
  );

  function startNewGame() {
    setAppState(defaultState);
  }

  //TODO this function will be defined on every render = overkill?
  function handleSquarePicked(i: number) {
    setErrorMessage("");
    const next = !appState.xIsNext;
    console.log("handleSquarePicked", appState.xIsNext, i, appState.boardHistory);
    const nextBoardState = [...appState.boardHistory[appState.boardHistory.length - 1]];

    if (isSquareIsAlreadyTakenByEnemy(nextBoardState, i)) {
      console.log("blocking move, because square was already taken")
      setErrorMessage("Square already taken!");
      return;
    }

    let winner = calculateWinner(nextBoardState);

    if (winner) {
      console.log("blocking move, because " + winner + " already won")
      setErrorMessage("Game is already over!");
      return;
    }

    setAppState((prev) => ({...prev, xIsNext: next}));
    nextBoardState[i] = next ? "X" : "O";
    winner = calculateWinner(nextBoardState);
    setAppState((prev) => ({...prev, boardHistory: [...prev.boardHistory, nextBoardState]}));
    if (winner) {
      console.log("winner", winner);
      setAppState((prev) => ({...prev, gameStatusMessage: winner + " has won the game!", gameFinished: true}));
    }
  }

  function isSquareIsAlreadyTakenByEnemy(nextBoardState: string[], i: number) {
    return nextBoardState[i] !== "";
  }

  function moveStateBack() {
    console.log("movestateback ", appState.boardHistory.length);
    const newHistory = appState.boardHistory.slice(0, -1);
    setAppState((prev) => ({...prev, boardHistory: newHistory}));
    console.log("movestateback NEW HISTORY", newHistory.length);
  }
}

function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
