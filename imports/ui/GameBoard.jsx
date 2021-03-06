import React, { Component } from 'react';

export default class GameBoard extends Component {

    currentPlayer(){
        //determine current player by counting filled cells
        //if even, it's the 1st player else it's player 2
        let filledCount = 0;
        for (let r=0; r<3; r++){
            for(let c=0; c<3; c++){
                if (this.props.game.board[r][c] !== null)
                filledCount ++;
            }
        }
        return (filledCount % 2 === 0 ? 0 : 1);
    }

    handleCellClick(row, col){
        let currentPlayer = this.currentPlayer();
        let game = this.props.game;
        game.board[row][col] = currentPlayer;
        Games.update(game._id, {
            $set: {board: game.board}
        });
    }

    renderCell(row, col){
        let value = this.props.game.board[row][col];
        if (value === 0) return (<td>0</td>)
        if (value === 1) return (<td>X</td>)
        if (value === null) return (
            <td onClick={this.handleCellClick.bind(this, row, col)}>
            </td>
        );
    }

    handleBackToGameList(){
        this.props.backToGameListHandler();
    }

    render(){
        return (
            <div>
                <button onClick={this.handleBackToGameList.bind(this)}>Back</button>
                <table className="game-board">
                    <tbody>
                        <tr>
                            {this.renderCell(0, 0)}
                            {this.renderCell(0, 1)}
                            {this.renderCell(0, 2)}
                        </tr>
                        <tr>
                            {this.renderCell(1, 0)}
                            {this.renderCell(1, 1)}
                            {this.renderCell(1, 2)}
                        </tr>
                        <tr>
                            {this.renderCell(2, 0)}
                            {this.renderCell(2, 1)}
                            {this.renderCell(2, 2)}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}