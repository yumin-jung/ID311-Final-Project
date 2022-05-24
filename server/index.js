const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', require('./routes/users'));

mongoose
    .connect('mongodb+srv://yumin:1234@cluster0.3vbre.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => console.log(`server running on ${PORT}`))