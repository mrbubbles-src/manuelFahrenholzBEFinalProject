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

async function userDeleteSelf(id) {
    await userNotFound(User, id);
    await User.findOneAndDelete({ _id: id });
}

async function adminDeleteUser(id) {
    await userNotFound(User, id);
    await User.findOneAndDelete({ _id: id });
}

async function showReadlist(userID) {
    const user = await User.findOne({ _id: userID })
        .select("username readList")
        .populate("readList.book", "title author published");
    const readList = user.readList.map((singleBook) => singleBook.book);
    return {
        title: `Hier ist deine Leseliste, ${user.username}:`,
        usersReadlist: readList,
    };
}

module.exports = {
    User,
    createUser,
    authenticateUser,
    updateUser,
    adminDeleteUser,
    userDeleteSelf,
    showReadlist,
};
