const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectToMongo } = require("./connection");
const URL = require("./model/url");
const PORT = 8000;
const MongoUrl = "mongodb://127.0.0.1:27017/short-url";

connectToMongo(MongoUrl) // connect to mongoDB
   .then(() => console.log("mongoDB Connected"))
   .catch(() => console.log("Something went wrong in mongoDb"));

app.get("/", (req, res) => {
   res.end("hello from node")
})

// use middleware 
app.use(express.json())

// for start request url "/url"
app.use("/url", urlRoute);

app.get("/:shortID", async (req, res) => {
   const shortId = req.params.shortID;
   // console.log("req", req, res)

   const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: {timestamp :  Date.now()} } })
   return res.redirect(entry.redirectUrl);

})




app.listen(PORT, () => console.log(`server started at port ${PORT} : http://localhost:${PORT}`))