
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

let GameModel = require('../models/Game');
let utils = require('../utilities/utils')

router.route('/getAll').get((req, res, next) => {
    GameModel.find()
    .populate('players')
    .exec((error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/create').post(async (req, res, next) => {
    let data = req.body
    let gameObject = {
        players: data.players
    }
    await GameModel.create(gameObject, async (error, data) => {
        if(error) {
            return next(error)
        } else {
            await utils.addGameToPlayers(gameObject.players)
            res.json(data)
        }
    })
})

router.route('/edit').post(async (req, res, next) => {
    let reqData = req.body
    let game = await GameModel.findOne({_id: reqData.id})
    await utils.deleteGameFromPlayers(game)
    game.players = reqData.players
    await game.save()
    await utils.addGameToPlayers(game)
    res.json(game)
})

router.route('/get/:id').get((req, res, next) => {
    GameModel.findOne({_id: req.params.id})
    .populate('players')
    .exec((error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/delete/:id').delete(async (req, res, next) => {
    let game = await GameModel.findOne({_id: req.params.id})
    await utils.deleteGameFromPlayers(game)
    GameModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

router.route('/deleteAll').delete((req, res, next) => {
    GameModel.deleteMany({}, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;