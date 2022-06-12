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
    messageList.findOneAndDelete({ solver: req.body.solver, message: req.body.message }, (err) => {
        if (err) res.json({ success: false, err });
        else res.status(200).json({ success: true });
    });
});

module.exports = router;