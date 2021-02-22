const router = require("express").Router();
const {
  findAll,
  createUser,
  addUserMovie,
  findAllUserMovies,
  deleteUserMovie,
  authenticateUser,
} = require("../controllers/user");

router.route("/").get(findAll).post(createUser);

router
  .route("/user/movies")
  .get(authenticateUser, findAllUserMovies)
  .post(authenticateUser, addUserMovie)
  .delete(authenticateUser, deleteUserMovie);

module.exports = router;
