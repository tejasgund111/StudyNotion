const mongoose = require("mongoose");
require("dotenv").config();

// Error resolved by these lines
const dns = require("dns");
dns.setServers(["1.1.1.1"], ["8.8.8.8"]);

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};