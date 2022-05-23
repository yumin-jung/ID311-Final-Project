const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
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

// const mongoose = require('mongoose');

// const commentSchema = mongoose.Schema({
//   writer: {
//     type: String,
//   },
//   content: {
//     type: String,
//   },
//   created_date: {
//     type: String,
//   },
//   postNO: {
//     type: Number,
//   },

// });

// const Comment = mongoose.model('Comment', commentSchema);

// module.exports = { Comment };
