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

async function httpGetAllBooks(req, res) {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(200).json([]);
    }
}

async function httpDeleteBook(req, res, next) {
    const { id } = req.params;
    try {
        const deletedBook = await deleteBook(id);
        res.status(204).json({
            message: "Buchdaten wurden gelöscht.",
            deletedBook: deletedBook,
        });
    } catch (error) {
        res.status(404).json({
            message: "Buch nicht gefunden",
        });
    }
}

module.exports = { httpSaveBook, httpGetAllBooks, httpDeleteBook };
