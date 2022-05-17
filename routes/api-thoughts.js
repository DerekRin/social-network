const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../controller/thoughts-controller");

router.route("/").get(getAllThoughts).post(createThoughts);

router.route("/:thoughtsId/reactions").post(addReaction);

router.route("/:thoughtsId").get(getThoughtsById).put(updateThoughts);

router
  .route("/:thoughtsId/notreactions")
  .delete(deleteThoughts)
  .delete(deleteReaction);

module.exports = router;
