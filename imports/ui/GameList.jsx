import React, { Component } from 'react';
import Games from '../api/collections/games.js';

export default class GameList extends Component {

    // create a new game
    handleNewGame(){
        Games.newGame(this.props.user);
    }

    // relay the mapped game info back to the enterGameHandler in <App>
    handleEnterGame(gameId){
        this.props.enterGameHandler(gameId);
    }

    handleJoinGame(gameId){
        Games.joinGame(gameId, this.props.user);
    }

    handleLeaveGame(gameId){
        Games.leaveGame(gameId, this.props.user);
    }

    //show each player's username on each game
    renderPlayers(game){
        let player1 = game.players.length > 0 ? game.players[0].username: '';
        let player2 = game.players.length > 1 ? game.players[1].username: ''
        return (
            <span>[{player1}] vs [{player2}]</span>
        )
    }

    myCurrentGameId(){
        //find the game that the user is in
        let game = _.find(this.props.games, (game) => {
            return _.find(game.players, (player) => {
                return player.userId === this.props.user._id;
            })
             !== undefined;
        });

        if (game === undefined) return null;
        return game._id;
    }

    render(){
        return (
            <div>
                <div>
                    <h1>Jojo's Game List</h1>
                    {/* map through the list of games, adding a button to each and increasing eaches index by 1/displaying eaches index as the game # */}
                    {this.props.games.map((game, index) => {
                        return (
                            <div key={game._id}>
                                <span>Game {index+1}</span>
                                {this.renderPlayers(game)}

                            {/* users can only leave if they're in the game room and the game hasn't started */}
                                {this.myCurrentGameId() === game._id && game.players.length < 2 ? (
                                    <button onClick={this.handleLeaveGame.bind(this, game._id)}>Leave</button> ) : null}

                                {/* users can only join if they're not in any others games and the game hasn't started */}
                                {this.myCurrentGameId() === null && game.players.length < 2 ? (
                                    <button onClick={this.handleJoinGame.bind(this, game._id)}>Join</button>) : null}
                                
                                {/* users can only enter if the game is started */}
                                {game.players.length === 2 ? (
                                    <button onClick=
                                    {this.handleEnterGame.bind(this, game._id)}>Enter</button>) : null}
                            </div>
                        )
                    })}
                </div>

                    {/* only show new game button if user is not in any room  */}
                    {this.myCurrentGameId() === null ? (
                        <div>
                            <button onClick={this.handleNewGame.bind(this)}>
                                New Game
                            </button>
                        </div>
                    ) : null}

            </div>  
        )
    }
}