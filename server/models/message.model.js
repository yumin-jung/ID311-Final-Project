const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;

const messageSchema = Schema(
    {
        quizCode: {
            type: String,
        },
        //nickname, color, order of pattern
        solver: [Object],
        message: {
            type: String,
        }
    }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;