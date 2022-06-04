const router = require("express").Router();
const mongoose = require('mongoose');
let Message = require("../models/message.model");

router.post("/saveMessage", (req, res) => {
    const message = new Message(req.body);
    message.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, message })
    });
});

router.post('/getMessage', (req, res) => {
    Message.find({})
        .exec((err, messages) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, messages });
        });
});

router.post('/deleteMessage', (req, res) => {
    const messageList = mongoose.model('Message');
    messageList.findOneAndDelete({ nickname: req.body.nickname, message: req.body.message }, (err) => {
        if (err) res.json({ success: false, err });
        console.log('delete message');
    });
});

module.exports = router;