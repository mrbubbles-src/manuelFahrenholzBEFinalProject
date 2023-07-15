const express = require("express");
const { httpGetAllBooks } = require("../controller/book.controller");
// const { authenticateToken } = require("../middleware/userValidation");

const router = express.Router();

router.get("/", httpGetAllBooks);

module.exports = router;
