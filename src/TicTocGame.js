import React, { Component } from 'react';

function Square(props) {
    return (
      <button className="square" style={props.style} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  function Row(props) {
    const start = this.props.start;
    const end = this.props.end;
    const squares = this.props.squares.slice(start, end+1);
    return (
      <div className="board-row">
        {squares.map((item, index) => {
          return (
            <Square
              style={props.style}
              onClick={props.onClick}
              value={props.value}
            />
          )
        })}
      </div>
    )
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      const winCondition = this.props.winCondition;
      let style;
      if(winCondition && winCondition.includes(i)) {
        style = {backgroundColor:'yellow'}
      }
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          style={style}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class TicTocGame extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          position: null,
        }],
        xIsNext: true,
        stepNumber: 0,
        isReverse: false,
        isOver: false,
        size: 3,
      }
    };
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    };
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const game = calculateWinner(squares);
      if (game.winner || squares[i]) {
        return;
      } 
      //place next move
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      //get row and colum of the next move
      this.setState({
        history: history.concat([{
          squares: squares,
          position: i
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }
    startOver() {
      this.setState ({
        history: [{
          squares: Array(9).fill(null),
          position: null,
        }],
        xIsNext: true,
        stepNumber: 0,
        isReverse: false,
        isOver: false,
      })
    }
    
    render() {
      
      let history = this.state.history;
      const current = history[this.state.stepNumber];
      const game = calculateWinner(current.squares);
      let status;
      if(game.winner === 'draw') {
        status = 'It is a draw.'
      } else if (game.winner) {
        status = 'Winner: ' + game.winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      const isReverse = this.state.isReverse;
      const moves = history.map((step, move) => {
        const squares = step.squares;
        const position = step.position;
  
        let col; let row;
        if (this.state.stepNumber > 0){
          [row, col] = getPosition(position);
        } else {
          [row, col] = [null, null];
        }
        
        const desc = move ?
          'Go to move #' + move + `(${row},${col})`:
          'Got to game start';
        
        const style = move === this.state.stepNumber?{fontWeight: "bold"} : {};
        
        return (
          <li key={move}>
            <button style={style}  onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      });
      
      const toggleReverse = (
        <button 
          onClick={() => 
            this.setState({
              isReverse : !isReverse
            })
        }>
          reverse
        </button>
      );
  
      const restart = (
        <button onClick={() => this.startOver()}>
          restart
        </button>
      )
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winCondition={game.positions}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{toggleReverse} {restart}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function getPosition(i) {
    const size = 3;
    const col = i%size;
    const row = Math.floor(i/size);
    return [row, col];
  }
  function isBoardFull(squares) {
    for (let i = 0; i<squares.length; i++) {
      if (!squares[i]){
        return false;
      } 
    }
    return true;
  }
  
  function calculateWinner(squares) {
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
        return {winner: squares[a], positions: [a,b,c]};
      }
    }
    if(isBoardFull(squares)) {
      return {winner:'draw', positions: null};
    }
    return {winner: null, positions: null};
  }

export default TicTocGame;