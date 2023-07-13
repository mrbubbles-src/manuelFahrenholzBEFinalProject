const { saveBook } = require("../model/book.model");

const secretTokenPW = process.env.TOKEN_SECRET;

async function httpSaveBook(req, res, next) {
    try {
        const book = req.body;
        const newBook = await saveBook(book);
        res.json(newBook);
    } catch (error) {
        next(error);
    }
}

module.exports = { httpSaveBook };
