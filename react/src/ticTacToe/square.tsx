import React, {MouseEventHandler} from 'react';

interface SquareProps {
  displayCharacter: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

// regular class syntax
class Square extends React.Component<SquareProps> {

  render() {
    console.log("Square");
    return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.displayCharacter}
        </button>
    );
  }
}

export default Square;
