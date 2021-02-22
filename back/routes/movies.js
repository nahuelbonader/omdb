const router = require("express").Router();
const { findOrCreateMovie, findAll } = require("../controllers/movie");

router.route("/").get(findAll);

module.exports = router;
