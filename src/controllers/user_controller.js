const Users = require('../models/user_models');

async function httpRegisterUser (req, res) {
    try{
        const {username, email, password} = req.body;

        // Basic validation (must be improved at production)
        if (!username || !email || !password){
            return res.status(400).json({message: "Please provide all fields"})
        }

        // Check for existing user
        const existingUser = await Users.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        // Create a new user
        const user = new Users({username, email, password});
        await user.save();

        // Respond with success without password
        res.status(201).json({
            message: "User created successfully",
            user: user.toObject({virtuals:true})
        });

    }catch (error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}

async function httpGetUsers(req, res){
    const users = await Users.find({}, "-password");

    // Access user data from req.user object (obtained from JWT)
    res.json({
        
        message: "Welcome, authorized user!",
        user: users
        // user: req.user
    })
}

module.exports = {
    httpRegisterUser,
    httpGetUsers
}