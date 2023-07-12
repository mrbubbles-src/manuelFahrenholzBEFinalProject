async function userNotFound(Model, username) {
    const user = await Model.findOne({ username: username });

    if (!user) {
        const error = new Error("Benutzer konnte nicht gefunden werden");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
    });
}

module.exports = (userNotFound, errorHandler);
