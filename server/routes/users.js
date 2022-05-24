const router = require("express").Router();
let User = require("../models/user.model");

router.post("/saveUsers", (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, user })
    });
});

module.exports = router;