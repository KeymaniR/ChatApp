const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"}) //Creating a token
}

const registerUser = async(req, res) => {

    try {
    const {name, email, password} = req.body; //Setting these from the imported userModel Model

    let user = await userModel.findOne({email}); //Find and set user based off of the email since it is set as unique

    if(user) 
        return res.status(400).json("User already exists"); //Check to see if the user already exists by checking email since its unique

    if(!name || !email || !password) 
        return res.status(400).json("All fields are required"); //Check if a field is missing

    if(!validator.isEmail(email)) 
        return res.status(400).json("Email must be a valid email...");//use validator to check if the email entered is valid


    if(!validator.isStrongPassword(password)) 
        return res.status(400).json("Password must be a strong password. 1 small character, 1 Uppercase one, a number, a special character ");  //use validator to check if the password is strong enough

        user = new userModel({name, email, password}); //Set user as an object of the userModel class so now it has access to use the name, email, and password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt); //Hash the password

        await user.save();

        const token=createToken(user._id);

        res.status(200).json({_id: user._id, name, email, token});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

    const loginUser = async(req, res) =>{  //Logging in the user
        const {email, password} = req.body;

        try{
            let user = await userModel.findOne({email});

            if(!user) return res.status(400).json("Invalid email or password.."); //This means we can get the user password from the database

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) return res.status(400).json("Invalid email or password..");


            const token=createToken(user._id);

            res.status(200).json({_id: user._id, name: user.name, email, token});

        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }

    };

    const findUser = async(req, res) =>{
        const userId = req.params.userId;
        try{
            const user = await userModel.findById(userId);

            res.status(200).json(user);

        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    };

    const getUsers = async(req, res) =>{

        try{
            const users = await userModel.find();

            res.status(200).json(users);

        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    };


module.exports = { registerUser, loginUser, findUser, getUsers };