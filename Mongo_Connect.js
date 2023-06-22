const mongoose = require("mongoose");

const MongoConnect = () => {

  mongoose.connect("mongodb+srv://JoseCanahuate:H7gSwgyWQW1GhkXe@parcial2ds9.7u3bro1.mongodb.net/")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Database connection error", error);
    });
};

module.exports = MongoConnect;
