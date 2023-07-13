const mongoose = require("mongoose");
const Book = require("./book.schema");

async function getAllBooks() {
    try {
        return await Book.find({});
    } catch (error) {
        throw new Error(error);
    }
}

async function saveBook(bookData) {
    return await Book.create(bookData);
}

async function deleteBook(id) {
    try {
        const book = await Book.findByIdAndRemove(id);
        return book;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { saveBook, getAllBooks, deleteBook };
