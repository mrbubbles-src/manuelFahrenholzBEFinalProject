const mongoose = require("mongoose");
const { UserRoles } = require("../lib/security/roles");
const { userNotFound } = require("../middleware/errorHandler");
const User = require("./user.schema");

async function createUser(userData) {
    return await User.create(userData);
}

async function authenticateUser(userName, password) {
    const user = await User.findOne({ userName });
    if (!user) {
        return null;
    }
}

/* Alle User anzeigen*/
// async function findAllUsers() {
//     return await User.find({});
// }

/* einzelne User anzeigen */
// async function findSingleUser(id) {
//     await userNotFound(User, id);
//     return await User.findById(id);
// }

async function updateUser(id, data) {
    await userNotFound(User);
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
    // findAllUsers,
    // findSingleUser,
    updateUser,
    deleteUser,
};
