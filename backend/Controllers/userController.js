const userModel = require('../Models/userModel');
const UserModel = require('../Models/userModel');
const bcrypt = require('bcrypt');


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
    const {currentUserId, currentUserAdminStatus, password, ...updateData} = req.body;
    if(id === currentUserId || currentUserAdminStatus){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, updateData,{
                new: true,
                select: '-password', //excluding the password field from the returned document
            });

            if(!user){
                return res.status(404).json("user not found");
            }


            res.status(200).json(user);
            
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
    const {currentUserId}= req.body;
    if(currentUserId === id){
        res.status(403).json("action forbidden. you cannot follow yourself");
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push: {followers: currentUserId}});
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
    const {currentUserId} = req.body;

    if(currentUserId === id){
        res.status(403).json("action forbidden");
    }else{
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({ $pull: {followers: currentUserId} });
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
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser }
