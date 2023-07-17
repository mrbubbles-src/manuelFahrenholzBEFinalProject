const express = require("express");
const { httpGetAllBooks } = require("../controller/book.controller");
const {
    authenticateToken,
    adminCheck,
} = require("../middleware/userValidation");
const {
    httpSaveBook,
    httpAdminDeleteBookFromDb,
    httpDeleteBookFromReadlist,
} = require("../controller/book.controller");

const router = express.Router();

router.get("/", authenticateToken, adminCheck, httpGetAllBooks);

router.post("/addBooks", authenticateToken, httpSaveBook);

router.delete(
    "/deleteBookFromDb/:id",
    authenticateToken,
    adminCheck,
    httpAdminDeleteBookFromDb
);
router.delete(
    "/deleteBookFromReadlist/:bookID",
    authenticateToken,
    httpDeleteBookFromReadlist
);
module.exports = router;
