const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("Welcome to the bookt server");
});

router.post("signup", validateInputs);
module.exports = router;
