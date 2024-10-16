const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({ // define the structure of the schema fot give the data
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }]
}, {
    timestamps: true
})

const URL = mongoose.model("url", urlSchema); // after that create the model for that schema

module.exports = URL