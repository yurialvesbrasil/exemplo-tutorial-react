import React from 'react';
import { Square } from './square.js';

export class Board extends React.Component {

    renderSquare(i) {
        return (<Square
            id={i}
            className={this.props.classes[i]} 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }
    
    renderRow(cols){
        return (<div className="board-row">{cols}</div>)
    }

    render() {
        let rows = []
        for (var y = 0; y <= this.props.rows - 1; y++) {
            let cols = []
            for (let x = 0; x <= this.props.cols - 1; x++) {
                cols.push(this.renderSquare(x+(y*3)));
            }
            rows.push(this.renderRow(cols));
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}
