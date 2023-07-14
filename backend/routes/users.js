const express = require("express");
const {
    httpCreateUser,
    httpAuthenticateUser,
    httpUpdateUser,
    httpDeleteUser,
    httpSaveBookToReadList,
} = require("../controller/user.controller");

const { userValidationRules } = require("../lib/inputValidation/userRules");

const { validateInputs } = require("../middleware/inputValidation");

const {
    authenticateToken,
    adminCheck,
    userCheck,
} = require("../middleware/userValidation");

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
router
    .use(authenticateToken, adminCheck, userCheck)
    .route("/updateReadList")
    .put(httpSaveBookToReadList);
router
    .use(authenticateToken)
    .route("/:id")
    .put(httpUpdateUser)
    .delete(httpDeleteUser);

module.exports = router;
