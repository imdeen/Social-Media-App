const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, followUser, unfollowUser }= require("../Controllers/userController.js");

const router = express.Router();

router.get("/:id", getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);

module.exports = router;