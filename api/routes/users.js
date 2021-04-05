const router = require("express").Router();
const {
  findUsers,
  createUser,
  addUserMovie,
  findAllUserMovies,
  deleteUserMovie,
} = require("../controllers/user");

const { authenticateUser } = require("../controllers/auth");

router.route("/").get(findUsers).post(createUser);

router
  .route("/user/movies")
  .get(authenticateUser, findAllUserMovies)
  .post(authenticateUser, addUserMovie)
  .delete(authenticateUser, deleteUserMovie);

module.exports = router;
