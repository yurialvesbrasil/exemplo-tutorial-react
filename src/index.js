import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <Fragment>
            <button className={"square "+((props.className!=null)?props.className:'')} onClick={props.onClick}>
                {props.value}
            </button>
        </Fragment>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (<Square
            className={this.props.classes[i]} 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                classes: Array(9).fill(null),
                referencia: [null,null,null],
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }


    getReferencia(i) {
        const jogador = this.state.xIsNext ? 'O' : 'X';
        switch (i+1) {
            case 1:
                return [jogador, 1, 1];
            case 2:
                return [jogador, 2, 1]; 
            case 3:
                return [jogador, 3, 1];
            case 4:
                return [jogador, 1, 2];
            case 5:
                return [jogador, 2, 2];
            case 6:
                return [jogador, 3, 2];
            case 7:
                return [jogador, 1, 3];
            case 8:
                return [jogador, 2, 3];
            case 9:
                return [jogador, 3, 3];
            default:
                return [];    

        }

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
