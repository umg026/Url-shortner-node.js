const User = require("../model/user");
const {v4: uuidv4} = require("uuid");
const { setUser, getUser } = require("../service/auth");
const bycrypt = require("bcrypt");

async function handelUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use" });
        }
        const hashedPassword = await bycrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });

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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Email Is not match to DB" });
        }
        
        const isMatch = await bycrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Password fails" });
        }
        // const sessionId = uuidv4();

       const token = setUser(user);
        res.cookie("uid", token) // set jwt token to cookie
       return  res.redirect('/'); // Temporary redirect to home after login
    

    //// for frontend header service
    // return res.json({token})


    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}
async function handelUserLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/login")
}
module.exports = { handelUserSignup, handelUserLogin ,handelUserLogout};
