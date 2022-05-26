const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;