const router = require("express").Router();
const {
  findUsers,
  createUser,
  addUserMovie,
  findAllUserMovies,
  deleteUserMovie,
  authenticateUser,
} = require("../controllers/user");

router.route("/").get(findUsers).post(createUser);

router
  .route("/user/movies")
  .get(authenticateUser, findAllUserMovies)
  .post(authenticateUser, addUserMovie)
  .delete(authenticateUser, deleteUserMovie);

module.exports = router;
