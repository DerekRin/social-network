const router = require("express").Router();

const thoughtsRoutes = require("./api-thoughts");
const userRoutes = require("./api-user");

router.use("/api/thoughts", thoughtsRoutes);
router.use("/api/user", userRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
