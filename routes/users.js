// Import packages
const express = require("express");
const router = express.Router();

// Importing local files
const User = require("../models/User");
const userController = require('../controller/user.controller')

// User Routes

// GET: Retrieve all users from the database
// This route will call the getAllUsers function in the user controller
router.get("/users", userController.getAllUsers);

// GET: Retrieve a specific user by their ID
// This route will call the getUserById function in the user controller
router.get("/users/:id", userController.getUserById);

// POST: Create a new user
// This route will call the createUser function in the user controller
router.post("/users", userController.createUser);

// PATCH: Update specific fields of a user by their ID
// This route will call the updateUserById function in the user controller
router.patch("/users/:id", userController.updateUserById);

// DELETE: Remove a specific user by their ID
// This route will call the deleteUserById function in the user controller
router.delete("/users/:id", userController.deleteUserById);

// Export the router so we can use it in the main server file
module.exports = router;
