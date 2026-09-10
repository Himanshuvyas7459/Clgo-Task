const express = require("express");

const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addUser
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;