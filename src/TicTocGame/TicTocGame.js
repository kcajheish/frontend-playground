import React, { Component } from 'react';
import {Button,Col, Row, Container} from 'react-bootstrap';


function Square(props) {
    return (
      <Button variant="outline-secondary" className="square" style={props.style} onClick={props.onClick}>
        {props.value}
      </Button>
    );
  }
  
  class Board extends React.Component {
    makeSquare(i) {
      const winCondition = this.props.winCondition;
      const buttonSize ="50px"
      let style = {
        boarder: buttonSize,
        height: buttonSize,
        width: buttonSize,
        fontSize: "20px",
        margin: "0px",
        padding: "0px",
      };
      if(winCondition && winCondition.includes(i)) {
        style.backgroundColor = 'yellow'
      } 
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          style={style}
        />
      );
    }

    makeRow(row, size) {
      let a_row = [];
      for(let col=0; col<size; col++) {
        let index = row*size + col;
        console.log('index' + index);
        a_row.push(this.makeSquare(index));
      }
      return a_row
    }
    makeBoard(size) {
      let rows = [];
      for (let row=0; row < size; row++) {
        rows.push(
          <div className='board-row'>
            {this.makeRow(row, size)}
          </div>
        );
      }
      return rows;
    }
  
    render() {
      const size = 3;
      return (
        <div>
          {this.makeBoard(size)}
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
          'Go to game start';
        
        const style = move === this.state.stepNumber?{fontWeight: "bold"} : {};
        
        return (
          <li key={move}>
            <Button variant="light" style={style}  onClick={() => this.jumpTo(move)}>{desc}</Button>
          </li>
        )
      });
  
      const restart = (
        <Button variant="info" onClick={() => this.startOver()}>
          restart
        </Button>
      )
  
      return (
        <div className="game">
          <Container>
            <Row>
              <Col xs={{ span: 3 }}>
                <div style={{ marginTop: "100px" }} className="game-board">
                  <h1>圈圈差差</h1>
                  <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winCondition={game.positions}
                  />
                </div>
                <div className="restart">{restart}</div>
                <div className="introduction">
                  <ol>
                    <li>點擊棋盤格下O或X</li>
                    <li>右方訊息欄提醒該回合的選手</li>
                    <li>右方有歷史紀錄</li>
                    <li>點擊任意紀錄，可以回溯</li>
                    <li>三個符號連線獲勝，有顏色提醒</li>
                    <li>平手有訊息提示</li>
                    <li>按restart，開新局</li>
                  </ol>
                </div>
              </Col>
              <Col xs={{ span: 3}}>
                <div style={{ marginTop: "75px" }} className="game-info">
                  <div>{status}</div>
                  <ol>{moves}</ol>
                </div>
              </Col>
            </Row>
          </Container>
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