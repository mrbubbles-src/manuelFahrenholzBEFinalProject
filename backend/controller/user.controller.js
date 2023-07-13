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
        const { id } = req.params;
        const updatedUser = await updateUser(id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function httpDeleteUser(req, res, next) {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateUser,
    httpAuthenticateUser,
    httpUpdateUser,
    httpDeleteUser,
};
