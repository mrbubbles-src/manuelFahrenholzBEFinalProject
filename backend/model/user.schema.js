const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { UserRoles } = require("../lib/security/roles");

const readListSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
});

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER,
    },
    readList: [readListSchema],
});

module.exports = mongoose.model("User", userSchema);
