import React, { Component } from 'react';
import Games from '../api/collections/games.js';

export default class GameList extends Component {

    // create a new game
    handleNewGame(){
        let gameDoc = {
            board: [[null, null, null] [null, null, null] [null, null, null]]
        };
        Games.insert(gameDoc); //insert each new game document into the mongo collection
    }

    // relay the mapped game info back to the enterGameHandler in <App>
    handleEnterGame(gameId){
        this.props.enterGameHandler(gameId);
    }

    render(){
        return (
            <div>
                <div>
                    <button onClick={this.handleNewGame.bind(this)}>
                        New Game
                    </button>
                </div>
                <div>
                    <h1>Jojo's Game List</h1>
                    {/* map through the list of games, adding a button to each and increasing eaches index by 1/displaying eaches index as the game # */}
                    {this.props.games.map((game, index) => {
                        return (
                            <div key={game._id}>
                                <span>Game {index+1}</span>
                                <button onClick={this.handleEnterGame.bind(this, game._id)}>Enter</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}