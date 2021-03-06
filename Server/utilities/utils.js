let GameModel = require('../models/Game');
let PlayerModel = require('../models/Player')

const mongoose = require('mongoose');
const { ELOMatch } = require('./EloMatch');

async function deleteGameFromPlayers(data) {
    let winnerTeam = data.blackWin ? data.blackTeam : data.whiteTeam
    let loserTeam = !data.blackWin ? data.blackTeam : data.whiteTeam
    winnerTeam = [mongoose.Types.ObjectId(winnerTeam.offense), mongoose.Types.ObjectId(winnerTeam.defense)]
    loserTeam = [mongoose.Types.ObjectId(loserTeam.offense), mongoose.Types.ObjectId(loserTeam.defense)]
    PlayerModel.updateMany({ _id: {$in: winnerTeam}}, {
        $pull: {
            games: data._id
        },
        $inc: {
            wins: -1
        }
    }, (err) => {
        if(err) {
            return next(error)
        }
    })
    PlayerModel.updateMany({ _id: {$in: loserTeam}}, {
        $pull: {
            games: data._id
        }
    }, (err) => {
        if(err) {
            return next(error)
        }
    })
}

async function addGameToPlayers(players, data) {
    players = await updateRating(players)

    players.forEach((p, i) => {
        PlayerModel.findById(p._id).exec((error, player) => {
            if (i == 0) player.wins++;
            player.games.push(data._id)
            player.rating = p.rating
            player.save()
        })
    })
}

async function updateRating(players) {
    let elo = new ELOMatch();
    players.forEach((p, i) => {
        elo.addPlayer(p._id, i, p.rating)
    });

    elo.calculateELOs();

    elo.players.forEach((p) => {
        players.find(player => player._id === p.name).rating = p.eloPost
    });

    return players
}

function getRatingDelta(myRating, opponentRating, myGameResult) {
    if ([0, 1].indexOf(myGameResult) === -1) {
        return null;
    }

    var myChanceToWin = 1 / ( 1 + Math.pow(10, (opponentRating - myRating) / 400));

    return Math.round(64 * (myGameResult - myChanceToWin));
}

module.exports = {
    deleteGameFromPlayers,
    addGameToPlayers
}