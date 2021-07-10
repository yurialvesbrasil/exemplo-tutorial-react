import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Board } from './board.js';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: [],
                classes: [],
                referencia: [null, null, null],
            }],
            ordem: "0",
            xIsNext: true,
            stepNumber: 0,
            cols: 6,
            rows: 6
        };
    }


    getReferencia(i) {
        const jogador = this.state.xIsNext ? 'O' : 'X';
        console.log(`${i} - ${Math.trunc((i * this.state.rows) / (this.state.rows * this.state.cols))} - ${Math.trunc(i - (this.state.cols * Math.trunc((i * this.state.rows) / (this.state.rows * this.state.cols))))}`)
        return [jogador, Math.trunc((i * this.state.rows) / (this.state.rows * this.state.cols)) + 1, Math.trunc(i - (this.state.cols * Math.trunc((i * this.state.rows) / (this.state.rows * this.state.cols)))) + 1];
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let referencia = current.referencia.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        //Armazena referencia
        referencia = this.getReferencia(i);

        //Zara array
        const classes = [];

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
        const winner = calculateWinner(current.squares, this.state.rows, this.state.cols);

        let moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' | ' + history[move].referencia[0] + "->(" + history[move].referencia[1] + "," + history[move].referencia[2] + ")" :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        console.log(this.state.ordem);
        if (this.state.ordem === "1") {
            moves = moves.sort(function (a, b) {
                if (a.key > b.key) {
                    return -1;
                }
                if (a.key < b.key) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            }).slice();
        } else {
            moves = moves.sort(function (a, b) {
                if (a.key > b.key) {
                    return 1;
                }
                if (a.key < b.key) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            }).slice();

        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
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
                    <div className="menu-order">
                        <ToggleButtonGroup value={this.state.ordem} onChange={(e, newOrdem) => this.setState({
                            ordem: newOrdem
                        })} exclusive aria-label="text formatting">
                            <ToggleButton value="1" aria-label="bold">
                                <ArrowDropUp />
                            </ToggleButton>
                            <ToggleButton value="0" aria-label="italic">
                                <ArrowDropDown />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares, rows, cols) {
    if ((rows === 3) && (cols === 3)) {
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
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
