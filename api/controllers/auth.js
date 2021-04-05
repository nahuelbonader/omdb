const passport = require("passport");

const controllers = {
  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).send(req.user);
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  },

  loggedInUser(req, res) {
    if (!req.user) return res.sendStatus(401);
    res.send(req.user);
  },

  authenticateUser(req, res, next) {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    next();
  },
};

module.exports = controllers;
