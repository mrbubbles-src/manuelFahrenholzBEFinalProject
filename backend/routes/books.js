const express = require("express");
const {
    httpGetAllBooks,
    httpSaveBook,
    httpDeleteBook,
} = require("../controller/book.controller");
const { authenticateToken } = require("../middleware/userValidation");

const router = express.Router();

router.get("/", httpGetAllBooks);

router.post("/addBooks", authenticateToken, httpSaveBook);

router.delete("/deleteBooks/:id", httpDeleteBook);

module.exports = router;
