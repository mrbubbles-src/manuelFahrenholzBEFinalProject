const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    description: { type: String },
    cover: { type: String },
    published: { type: String },
    olid: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
