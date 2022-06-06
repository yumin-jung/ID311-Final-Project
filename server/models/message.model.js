const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;

const messageSchema = Schema(
    {
        quizCode: {
            type: String,
        },
        nickname: {
            type: String,
        },
        message: {
            type: String,
        }
    }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;