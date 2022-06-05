const router = require("express").Router();
let Score = require("../models/score.model");

router.post("/saveScore", (req, res) => {
    const score = new Score(req.body);
    score.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, score })
    });
});

router.post('/getScore', (req, res) => {
    Score.find({})
        .exec((err, scores) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, scores });
        });
});

module.exports = router;