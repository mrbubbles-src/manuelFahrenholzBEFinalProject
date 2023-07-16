const Book = require("../model/book.schema");
const {
    saveBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
} = require("../model/book.model");
const User = require("../model/user.schema");
const { showReadlist } = require("../model/user.model");

async function httpSaveBook(req, res, next) {
    try {
        // buch daten
        const book = req.body;
        // userID aus dem token
        const { userID: _userID } = req;

        // überprüfung ob buch anhand olid n DB vorhanden ist
        const existingBook = await Book.findOne({ olid: book.olid });

        // variable zum einspeichern der Buch ID
        let bookID;

        // abfrage ob buch bereits in buch collection ist
        if (existingBook) {
            console.log("buch vorhanden");
            // wenn buch vorhanden ist, wird dessen mongoDB_id in bookID abgespeichert
            bookID = existingBook._id;
        } else {
            console.log("buch noch nicht vorhanden");
            // wenn buch nicht vorhanden ist, wird es erstellt
            const newBook = await saveBook(book);
            // mongoDB_id vom neuerstelltem buch wir in bookID abgespeichert
            bookID = newBook._id;
        }

        // user anhand von _id aus dem token finden
        const user = await User.findOne({ _id: _userID });

        // abfrage ob bookID bereits in readList vorhanden ist
        if (
            user.readList.some(
                (item) => item.book.toString() === bookID.toString()
            )
        ) {
            // wenn ja rückmeldung geben dass es der fall ist
            console.log("Buch ist bereits auf ihrer Readlist");
        } else {
            // ansonsten bookID in readList array pushen
            user.readList.push({ book: bookID });
            // user speichern
            await user.save();
            console.log("Buch wurde der Readlist hinzugefügt");
        }
        const readList = await showReadlist(_userID);
        res.status(200).json({ title: "Readlist:", readlist: readList });
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

// async function httpGetSingleBook(req, res) {
//     const { id } = req.params;
//     try {
//         const book = await findById(id);
//         res.status(200).json(book);
//     } catch (error) {
//         res.status(404).json({ message: "Book not found!" });
//     }
// }

async function httpAdminDeleteBookFromDb(req, res, next) {
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

module.exports = {
    httpSaveBook,
    httpGetAllBooks,
    // httpGetSingleBook,
    httpAdminDeleteBookFromDb,
    httpDeleteBook,
};
