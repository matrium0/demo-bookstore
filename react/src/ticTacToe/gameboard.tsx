import React, {ReactElement} from 'react';
import ApplicationContext from '../shared/ApplicationContext';
import Square from './square';

interface GameBoadProps {
  currentBoardState: Array<string>;
  squarePicked: (i: number) => void;
}

function GameBoard(props: GameBoadProps): ReactElement {
  const applicationContext = React.useContext(ApplicationContext);

  console.log("GameBoard - props:", props)

  function renderSquare(i: number): ReactElement {
    return <div><Square displayCharacter={props.currentBoardState[i]} onClick={() => props.squarePicked(i)}/></div>;
  }

  return (
    <>
      <div>user: {applicationContext.user}</div>
      <h4>Tic Tac Toe with React</h4>
      <div className="d-flex">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="d-flex">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="d-flex">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}

export default GameBoard;
