const router = require("express").Router();
const passport = require("passport");
const { loginUser, logoutUser, loggedInUser } = require("../controllers/user");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", loggedInUser);

module.exports = router;
