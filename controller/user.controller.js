const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description create new user
 * @param {*} req
 * @param {*} res
 * @returns
 */



exports.createUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Please provide all fields." });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "This username already exists" });
    }

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There is an error", error: error.message });
  }
};


exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (updatedUser === null) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There is an error", error: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const removedUser = await User.findByIdAndRemove(req.params.id);

    if (!removedUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: `User with id ${req.params.id} deleted.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There is an error", error: error.message });
  }
};
