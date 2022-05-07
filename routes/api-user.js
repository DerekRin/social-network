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

router.route("/").get(getAllUsers).post(createUser).post(addFriend);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)
  .delete(deleteFriend);

module.exports = router;
