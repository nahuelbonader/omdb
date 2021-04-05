const router = require("express").Router();
const { login, logout, loggedInUser } = require("../controllers/auth");

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", loggedInUser);

module.exports = router;
