const express = require("express");
const {
    httpGetAllBooks,
    httpSaveBook,
    httpDeleteBook,
} = require("../controller/book.controller");

const router = express.Router();

router.get("/", httpGetAllBooks);

router.post("/addBooks", httpSaveBook);

router.delete("/deleteBooks/:id", httpDeleteBook);

module.exports = router;
