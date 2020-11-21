const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let playerGameSchema = new Schema({
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    elo: {
        type: Schema.Types.Number
    }
}, {
    collection: 'playergame',
    timestamps: true
})

module.exports = mongoose.model('PlayerGame', playerGameSchema)