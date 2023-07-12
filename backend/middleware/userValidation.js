const { validateToken } = require("../lib/security/token");
const { userRoles } = require("../lib/security/roles");

async function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error("Invalid token");
        error.statusCode = 401;
        return next(error);
    }
    try {
        const decodedToken = await validateToken(token, "H6m2wbqM0CZwoUVxS6fS");
        req.user = decodedToken;
        next();
    } catch (error) {
        error.statusCode = 403;
        return next(error);
    }
}

function adminCheck(req, res, next) {
    const user = req.user;
    if (user.role === userRoles.ADMIN) {
        next();
    } else {
        const error = new Error("Sie haben keine Administrationsrechte");
        error.statusCode = 403;
        return next(error);
    }
}

module.exports = { authenticateToken, adminCheck };
