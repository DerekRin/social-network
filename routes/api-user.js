const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../controller/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId/friend/:userId").post(addFriend);

router.route("/:userId").get(getUserById).put(updateUser);

router
  .route("/:userId/notfriend/:userId")
  .delete(deleteUser)
  .delete(deleteFriend);

module.exports = router;
