const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1758311",
    key: "63c0e93f7c9e3748001c",
    secret: "a3297a5a1530bb51bfa0",
    cluster: "ap2",
    useTLS: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res)=>{
    const newVote = {
        os: req.body.os,
        points: 1
    };

    new Vote(newVote).save().then(vote =>{
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
    
        return res.json({ success: true, message: 'Thank you for voting' });
    })
  
})

module.exports = router;