const mongoose = require("mongoose");
const Book = require("./book.schema");

async function createBook(bookData) {
    return await Book.create(bookData);
}

module.exports = { createBook };
