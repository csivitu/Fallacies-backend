/* eslint-disable*/
const leaderboard = require('express').Router();
const user = require('../models/User');

leaderboard.get('/', async (req, res) => {
    const names = {};
    const users = await user.find({});
    users.forEach((i) => {
        if (names[i.points]) {
            names[i.points][i.timestamp] = i.username;
        } else {
            names[i.points] = {
                [i.timestamp]: i.username
            };
        }
    });
    const keys = Object.keys(names).sort((a, b) => { return b - a; });
    const table = [];
    keys.forEach((i) => {
        const keys2 = Object.keys(names[i]).sort();
        keys2.forEach((j) => {
            table.push({
                username: names[i][j],
                points: i,
            });
        });
    });
    res.render('leaderboard', {
        leaderboard: table.slice(0, 10),
    });
});
module.exports = leaderboard;