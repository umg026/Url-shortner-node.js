const User = require("../model/user");
const {v4: uuidv4} = require("uuid");
const { setUser, getUser } = require("../service/auth");


async function handelUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use" });
        }
        await User.create({ name, email, password });

        return  res.redirect("/login") // Redirect to login page after signup
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ msg: "Failed to authenticate" });
        }
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId)


        return  res.redirect('/'); // Temporary redirect to home after login
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = { handelUserSignup, handelUserLogin };
