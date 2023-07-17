const express = require("express");
const { httpGetAllBooks } = require("../controller/book.controller");
const {
    authenticateToken,
    adminCheck,
} = require("../middleware/userValidation");

const router = express.Router();

router.get("/", authenticateToken, adminCheck, httpGetAllBooks);

module.exports = router;
