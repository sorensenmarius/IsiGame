const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let playerSchema = new Schema({
    name: {
        type: String
    },
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'PlayerGame'
    }],
    avatar: {
        type: String,
        default: ''
    },
    wins: {
        type: Number,
        default: 0
    },
    longestWinningStreak: {
        type: Number,
        default: 0
    },
    longestLosingStreak: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 1500
    }
}, {
    collection: 'players',
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema)