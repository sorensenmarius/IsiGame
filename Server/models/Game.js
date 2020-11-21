const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let gameSchema = new Schema({
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
}, {
    collection: 'games',
    timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)