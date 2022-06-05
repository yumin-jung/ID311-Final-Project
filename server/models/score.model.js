const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;

const scoreSchema = Schema(
    {
        nickname: {
            type: String,
        },
        score: {
            type: Number,
        },
        quizLen: {
            type: Number
        }
    }
);

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;