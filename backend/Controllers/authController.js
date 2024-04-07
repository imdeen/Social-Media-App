const userModel = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


//registering a new user
const registerUser = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;
    const newUser = new userModel(req.body);
    const {email} = req.body;

    try{
        const oldUser = await userModel.findOne({email})
        if(oldUser){
            return res.status(400).json({message: "email already registered"});
        }
        const user =  await newUser.save();
        const token = jwt.sign({
            email: user.email, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h'})
        res.status(200).json({user, token});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

//login User

const loginUser = async(req, res) => {
    const {email, password} = req.body

    try{
        const user = await userModel.findOne({email: email})
        const validity = await bcrypt.compare(password, user.password)

        if(!validity)
        {
            res.status(400).json("wrong password")
        }
        else{
            const token = jwt.sign({
                email: user.email, id: user._id
            }, process.env.JWT_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {loginUser, registerUser};
