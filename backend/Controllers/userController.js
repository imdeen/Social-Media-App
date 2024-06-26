const UserModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get all users
const getAllUsers = async(req, res) => {
    try {
        let users = await UserModel.find();

        users = users.map((user)=> {
            const {password, ...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a user
const getUser = async(req, res)=> {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if(user){
   const {password, ...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        }else{
            res.status(404).json("no such user exists")
        }
        
    } catch (error) {
        res.status(500).json(error);
        
    }
}

//update user
const updateUser = async(req, res)=> {
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password, ...updateData} = req.body;
    if(id === _id){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, updateData,{
                new: true,
                select: '-password', //excluding the password field from the returned document
            });
            const token = jwt.sign(
                {email: user.email, id: user._id},
                process.env.JWT_KEY, {expiresIn: '1h'}

            )

            if(!user){
                return res.status(404).json("user not found");
            }

            console.log({user, token});
            res.status(200).json({user, token});
            
        } catch (error) {
            res.status(500).json(error);  
        }
    }else{
        res.status(403).json("access denied! you can only update your own profile");
    }
};

//delete a user
const deleteUser = async(req,res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus} = req.body;
     
    if(currentUserId === id || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("user deleted sucessfully");
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    }else{
        res.status(403).json("access denied! you can only delete your own profile");
    }
}

// follow a User
const followUser = async(req, res)=> {
    const id = req.params.id;
    const {_id}= req.body;
    if(_id === id){
        res.status(403).json("action forbidden. you cannot follow yourself");
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push: {followers: _id}});
                await followingUser.updateOne({ $push: {following: id}});
                res.status(200).json("User followed!")
            }else{
                res.status(400).json("user is already followed by you");
            }
            
        } catch (error) {
            res.status(500).json(error);            
        }
    }
}


//Unfollow a User
const unfollowUser = async(req, res)=> {
    const id = req.params.id;
    const {_id} = req.body;

    if(_id === id){
        res.status(403).json("action forbidden");
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({ $pull: {followers: _id} });
                await followingUser.updateOne({ $pull: {following: id} });
                res.status(200).json("user unfollowed!");
            }else{
                res.status(403).json("user is not followed by you");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser }
