const mongoose = require("mongoose");
const Book = require("./book.schema");
const User = require("./user.schema");

async function getAllBooks() {
    try {
        return await Book.find({});
    } catch (error) {
        throw new Error(error);
    }
}

async function getSingleBook(id) {
    try {
        const book = await Book.findById(id);
        return book;
    } catch (error) {
        throw new Error(error);
    }
}

async function saveBook(bookData) {
    try {
        return await Book.create(bookData);
    } catch (error) {
        throw error;
    }
}

async function adminDeleteBookFromDb(id) {
    try {
        const book = await Book.findByIdAndRemove(id);
        return book;
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteBookFromReadlist(userID, bookID) {
    try {
        const user = await User.findOne({ _id: userID });
        const userReadlist = user.readList;
        if (userReadlist.length === 0) {
            console.log("Keine Bücher auf der leseliste vorhanden.");
        } else {
            const updatedReadlist = userReadlist.filter(
                (bookInList) => bookInList.book.toString() !== bookID
            );
            // console.log(updatedReadlist);
            user.readList = updatedReadlist;
            await user.save();
        }
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    saveBook,
    getAllBooks,
    getSingleBook,
    adminDeleteBookFromDb,
    deleteBookFromReadlist,
};
