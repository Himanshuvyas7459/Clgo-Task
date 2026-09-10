const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =========================
// GET ALL USERS
// =========================
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// ADD USER
// =========================
const addUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (!["Admin", "User"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User added successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Add user error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// UPDATE USER
// =========================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !role) {
      return res.status(400).json({
        message: "Full name, email and role are required",
      });
    }

    if (!["Admin", "User"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const emailExists = await User.findOne({
      email,
      _id: { $ne: id },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    user.fullName = fullName;
    user.email = email;
    user.role = role;

    // Password is optional while editing
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// DELETE USER
// =========================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};