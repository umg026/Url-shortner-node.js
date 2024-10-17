const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
    // Corrected the access to cookies
// console.log("req", req)
    const userId = req.cookies?.uid;

    if (!userId) return res.redirect('/login');

    const user = getUser(userId);
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}
async function checkAuth(req, res, next) {
    // Corrected the access to cookies
// console.log("req", req)
    const userId = req.cookies?.uid;
    const user = getUser(userId);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth
};
