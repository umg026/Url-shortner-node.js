const express = require("express");
const app = express();
const path = require("path")
const urlRoute = require("./routes/url");
const userRouter = require("./routes/user")
const { connectToMongo } = require("./connection");
const URL = require("./model/url");
const PORT = 8000;
const MongoUrl = "mongodb://127.0.0.1:27017/short-url";
const staticRoute = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUser, checkAuth } = require("./middlewares/auth");


connectToMongo(MongoUrl) // connect to mongoDB
   .then(() => console.log("mongoDB Connected"))
   .catch(() => console.log("Something went wrong in mongoDb"));


//set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// use middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// for start request url "/url"
app.use(cookieParser())
app.use("/url",restrictToLoggedInUser, urlRoute);
app.use("/user", userRouter);
app.use("/",checkAuth, staticRoute);

app.get("/url/:shortID", async (req, res) => {
   const shortId = req.params.shortID;
   // console.log("req", req, res)

   const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } })
   return res.redirect(entry.redirectUrl);

})




app.listen(PORT, () => console.log(`server started at port ${PORT} : http://localhost:${PORT}`))