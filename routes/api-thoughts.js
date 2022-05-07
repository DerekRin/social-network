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

router.route("/").get(getAllThoughts).post(createThoughts).post(addReaction);

router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts)
  .delete(deleteReaction);

module.exports = router;
