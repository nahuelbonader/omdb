const router = require("express").Router();
const passport = require("passport");
const { loginUser, logoutUser, loggedInUser } = require("../controllers/user");

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }), // el failureRedirect no está funcionando
  loginUser
);
router.post("/logout", logoutUser);
router.get("/me", loggedInUser);

module.exports = router;
