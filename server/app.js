const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connection = mongoose.connection;
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://yumin:1234@cluster0.3vbre.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.once("open", () => {
    console.log("MongoDB database connection succes");
});

app.get('/api/posts', (req, res) => {
    res.json('dkdk')
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))