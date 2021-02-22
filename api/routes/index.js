const router = require("express").Router();
const usersRoutes = require("./users");
const moviesRoutes = require("./movies");
const authRoutes = require("./auth");

router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);
router.use("/auth", authRoutes);

module.exports = router;
