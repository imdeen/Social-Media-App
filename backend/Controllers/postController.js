const PostModel = require('../Models/postModel.js');
const mongoose = require('mongoose');
const UserModel = require('../Models/userModel.js');


//create new post 
const createPost = async (req, res) => {
    // Create a new post instance using the postModel and the request body
    const newPost = new PostModel(req.body);

    try {
        // Save the new post to the database asynchronously
        await newPost.save();
        
        // If the save is successful, send a 200 OK response with a JSON message
        res.status(200).json(newPost);
    } catch (error) {
        // If an error occurs during the save operation, send a 500 Internal Server Error response with the error details
        res.status(500).json(error);
    }
};




//get a post
const getPost = async (req, res) => {
    // Extract the post ID from the request parameters
    const id = req.params.id;

    try {
        // Attempt to find a post by its ID using the PostModel
        const post = await PostModel.findById(id);

        // If a post with the specified ID is found, send a 200 OK response with the post data in JSON format
        res.status(200).json(post);
    } catch (error) {
        // If an error occurs during the retrieval operation, send a 500 Internal Server Error response with the error details
        res.status(500).json(error);
    }
};




//update a post
const updatePost = async (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    // Extract the userId from the request body
    const { userId } = req.body;

    try {
        // Find the post by its ID
        const post = await PostModel.findById(postId);

        // Check if the user trying to update the post is the owner of the post
        if (post.userId == userId) {
            // If the user is the owner, update the post using updateOne and the request body
            await post.updateOne({ $set: req.body });

            // Respond with a 200 OK status and a JSON message indicating that the post has been updated
            res.status(200).json("Post Updated");
        } else {
            // If the user is not the owner, respond with a 403 Forbidden status
            res.status(403).json("Action Forbidden");
        }
    } catch (error) {
        // If an error occurs during the update operation, respond with a 500 Internal Server Error status and the error details
        res.status(500).json(error);
    }
};


//delete a post
const deletePost = async (req, res) => {
    // Extract the post ID from the request parameters
    const id = req.params.id;

    // Extract the userId from the request body
    const { userId } = req.body;

    try {
        // Find the post by its ID
        const post = await PostModel.findById(id);

        // Check if the user trying to delete the post is the owner of the post
        if (post.userId == userId) {
            // If the user is the owner, delete the post using deleteOne
            await post.deleteOne();

            // Respond with a 200 OK status and a JSON message indicating that the post has been deleted
            res.status(200).json("Post deleted successfully");
        } else {
            // If the user is not the owner, respond with a 403 Forbidden status
            res.status(403).json("Action Forbidden");
        }
    } catch (error) {
        // If an error occurs during the deletion operation, respond with a 500 Internal Server Error status and the error details
        res.status(500).json(error);
    }
};

const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        // If userId is not in the likes array, add it
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post liked", liked: true });
        } else {
        // If userId is already in the likes array, remove it
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked", liked: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await PostModel.find({ userId: userId });
      const followingPostsResult = await UserModel.aggregate([
        {
          $match: {
            _id: userId,
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
     // Check if followingPosts is defined before accessing its property
     const followingPosts = followingPostsResult[0]?.followingPosts || [];

     const sortedPosts = currentUserPosts.concat(...followingPosts).sort((a, b) => b.createdAt - a.createdAt);
 
     res.status(200).json(sortedPosts);
   } catch (error) {
     res.status(500).json({ error: "Internal server error", details: error.message });
   }
 };
  
module.exports = {createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts}
  




