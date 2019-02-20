import { Mongo } from 'meteor/mongo';

export default Games = new Mongo.Collection('games');

_.extend(Games, {

    newGame() {
        let gameDoc = {
            board: [[null, null, null], [null, null, null], [null, null, null]],
            players: []
        };
        //insert a new game into the mongo collection & return the newly created game's id
        let gameId = Games.insert(gameDoc);
        return gameId;
    },
      
    //allow users to join by pushing them into the game, which is found with the gameId 
    //update/set the game with the new user
    joinGame(gameId, user){
        let game = Games.findOne(gameId);
        game.players.push({
            userId: user._id,
            username: user.username
        });
        Games.update(game._id, {
            $set: {players: game.players}
        });
    },

    //different from findOneandRemove -- we just want to 'reject'/eject users from the current game when they click the leave game button
    leaveGame(gameId, user){
        let game = Games.findOne(gameId);
        game.players = _.reject(game.players, (player) => {
            return player.userId === user._id;
        });
        Games.update(game._id, {
            $set: {players: game.players}
        });
    }
}) 