const { getUser } = require("../service/auth");

async function checkforAuthentication(req, res, next) {
    // const headerValue = req.headers['authorization'] // for frontend header service
    // res.user = null; // for frontend service
    //for frontend service
    // if (!headerValue || headerValue.startsWith('Bearer')) return next();
    // const token = headerValue.split("Bearer ")[1]


    // for JWT service
    console.log("req object", req.cookies)
    const userId = req.cookies?.uid;
    const user = getUser(userId); // for jwt service use userId insted of token

    req.user = user;
    next();
}

// ADMIN, ROLE
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.end("UnAuthorised");
        return next();
    }
}



// async function restrictToLoggedInUser(req, res, next) {
//     // Corrected the access to cookies
//     // const userId = req.cookies?.uid; // for jwt service
//     const userId = req.headers['authorization'] // for frontend header service

//     if (!userId) return res.redirect('/login');
//     const token = userId.split("Bearer ")[1] // 'Bearer eHgjhdbsdbjjhee'
//     const user = getUser(token); // for jwt service use userId insted of token
//     if (!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }
// async function checkAuth(req, res, next) {
//     // Corrected the access to cookies
//     // console.log("req", req)
//     // const userId = req.cookies?.uid; // for JWT Service
//     const userId = req.headers['authorization'] // for frontend header service
//     const token = userId.split("Bearer ")[1] // 'Bearer eHgjhdbsdbjjhee'

//     const user = getUser(token); // for jwt service use userId insted of token

//     req.user = user;
//     next();
// }

module.exports = {
    // restrictToLoggedInUser,
    // checkAuth,
    checkforAuthentication,
    restrictTo
};
