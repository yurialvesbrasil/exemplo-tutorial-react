import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Board } from './board.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: [],
                classes: [],
                referencia: [null,null,null],
            }],
            xIsNext: true,
            stepNumber: 0,
            cols:3,
            rows:3
        };
    }


    getReferencia(i) {
        const jogador = this.state.xIsNext ? 'O' : 'X';
        console.log(`${i} - ${Math.trunc((i/this.state.cols))+1} - ${Math.trunc((i/this.state.rows))+i}`)
        return [jogador, Math.trunc((i/this.state.cols))+1, Math.trunc((i/this.state.rows))];
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const classes = current.classes.slice();
        let referencia = current.referencia.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        //Armazena referencia
        referencia = this.getReferencia(i);
        
        //Zara array
        for ( var x = 0; x < classes.length; x++ ){
            classes[x] = "";
        }

        //Atualiza classes 
        classes[i] = "negrito";

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                referencia: referencia,
                classes: classes
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move +' | '+ history[move].referencia[0]+"->("+history[move].referencia[1]+","+history[move].referencia[2]+")":
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        cols={this.state.cols}
                        rows={this.state.rows}
                        classes={current.classes}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
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
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
