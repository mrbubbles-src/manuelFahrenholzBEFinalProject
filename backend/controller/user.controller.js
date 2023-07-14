require("dotenv").config();
const {
    createUser,
    authenticateUser,
    updateUser,
    deleteUser,
} = require("../model/user.model");
const { createSecurityToken } = require("../lib/security/token");

const secretTokenPW = process.env.TOKEN_SECRET;

async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}
async function httpAuthenticateUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if (!user) {
            const error = new Error("Falsches Passwort oder Benutzername");
            error.statusCode = 400;
            throw error;
        }
        const securityToken = await createSecurityToken(
            {
                _id: user._id,
                username: user.username,
                password: user.password,
                role: user.role,
            },
            secretTokenPW
        );
        res.json({ user, securityToken });
    } catch (error) {
        next(error);
    }
}

async function httpUpdateUser(req, res, next) {
    try {
        const { userID: id } = req;
        console.log("updateUserID", req.userID);
        console.log("const id", id);
        const updatedUser = await updateUser(id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function httpDeleteUser(req, res, next) {
    try {
        const { userID: id } = req;
        await deleteUser(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function httpSaveBookToReadList(req, res, next) {
    try {
        // const {id} = req.params;

        // const createdBooks = await Book.insertMany(bookArray);

        const bookIDs = createdBooks.map((book) => book._id);

        const updatedUsers = userArray.map((user, index) => {
            user.book = bookIDs[index];
            return user;
        });

        await User.insertMany(updatedUsers);
        // console.log("Beispieldaten erfolgreich eingefügt.");
        // mongoose.disconnect();
    } catch (error) {
        console.error("Fehler beim Einfügen der Beispieldaten:", error);
    }
}

module.exports = {
    httpCreateUser,
    httpAuthenticateUser,
    httpUpdateUser,
    httpDeleteUser,
    httpSaveBookToReadList,
};
