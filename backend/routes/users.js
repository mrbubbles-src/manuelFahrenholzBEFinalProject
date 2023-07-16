const express = require("express");
const {
    httpCreateUser,
    httpAuthenticateUser,
    httpUpdateUser,
    httpAdminDeleteUser,
    httpUserDeleteSelf,
    httpShowReadList,
} = require("../controller/user.controller");

const { userValidationRules } = require("../lib/inputValidation/userRules");

const { validateInputs } = require("../middleware/inputValidation");

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

router.get("/", authenticateToken, function (req, res, next) {
    res.send("Welcome to the bookt server");
});

router.post(
    "/signup",
    validateInputs(userValidationRules.signup),
    httpCreateUser
);
router.post(
    "/login",
    validateInputs(userValidationRules.login),
    httpAuthenticateUser
);

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

router.get("/getReadlist", authenticateToken, httpShowReadList);

router.put("/updateUser", authenticateToken, httpUpdateUser);

router.delete("/adminDeleteUser/:id", authenticateToken, httpAdminDeleteUser);

router.delete("/userDeleteSelf", authenticateToken, httpUserDeleteSelf);

module.exports = router;
