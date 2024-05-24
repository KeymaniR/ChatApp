const mongoose = require("mongoose");
//Legit just a model to show how we want to store the info we recieve into the database
const userSchema = new mongoose.Schema(
{
    name: {type: String, required : true, minLength: 3, maxLength: 30},
    email: {
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 200, 
        unique: true,
    },
    password: {type: String, required: true, minLength: 3, maxLength: 1024},
},{
    timestamps: true,
}
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;