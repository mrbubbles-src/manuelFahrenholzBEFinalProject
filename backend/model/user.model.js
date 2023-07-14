const mongoose = require("mongoose");
const { UserRoles } = require("../lib/security/roles");
const { userNotFound } = require("../middleware/errorHandler");
const User = require("./user.schema");

async function createUser(userData) {
    return await User.create(userData);
}

async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }

    const isPasswordValid = await user.authenticate(password);

    if (!isPasswordValid) {
        return null;
    }

    return user;
}

async function updateUser(id, data) {
    await userNotFound(User, id);
    return await User.findOneAndUpdate({ _id: id }, data, { new: true });
}

async function deleteUser(id) {
    const user = await userNotFound(User, id);

    if (user.role !== UserRoles.ADMIN) {
        const error = new Error("Unzurreichende Berechtigungen");
        error.statusCode = 403;
        throw error;
    }
    await User.findOneAndDelete({ _id: id });
}

module.exports = {
    User,
    createUser,
    authenticateUser,
    updateUser,
    deleteUser,
};
