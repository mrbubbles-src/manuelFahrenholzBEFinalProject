const mongoose = require("mongoose");
const { UserRoles } = require("../lib/security/roles");
const { userNotFound } = require("../middleware/errorHandler");
const User = require("./user.schema");

async function createUser(userData) {
    try {
        return await User.create(userData);
    } catch (error) {
        throw error;
    }
}

async function authenticateUser(username, password) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return null;
        }

        const isPasswordValid = await user.authenticate(password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, data) {
    try {
        await userNotFound(User, id);
        return await User.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
        throw error;
    }
}

async function userDeleteSelf(id) {
    try {
        await userNotFound(User, id);
        await User.findOneAndDelete({ _id: id });
    } catch (error) {
        throw error;
    }
}

async function adminDeleteUser(id) {
    try {
        await userNotFound(User, id);
        await User.findOneAndDelete({ _id: id });
    } catch (error) {
        throw error;
    }
}

async function showReadlist(userID) {
    try {
        const user = await User.findOne({ _id: userID })
            .select("username readList")
            .populate("readList.book", "title author published");
        const readList = user.readList.map((singleBook) => singleBook.book);
        return {
            title: `Hier ist deine Leseliste, ${user.username}:`,
            usersReadlist: readList,
        };
    } catch (error) {
        throw error;
    }
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
