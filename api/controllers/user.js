const { User, Movie } = require("../db/models");
const passport = require("passport");

const usersControllers = {
  findUsers(req, res) {
    User.find()
      .populate("movies")
      .then((users) => res.send(users))
      .catch((err) => res.status(404).send(err));
  },

  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password)
        return res.status(400).send("Incomplete data");

      const user = await User.findOne({ email });

      if (user) return res.status(400).send("User already exist");

      const newUser = await User.create(req.body);

      if (newUser) res.status(201).send({ firstName, lastName, email });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addUserMovie(req, res) {
    User.findById(req.user._id)
      .populate("movies")
      .then((user) => {
        Movie.findOne({ imdbID: req.body.imdbID })
          .then((movie) => {
            if (movie) return movie;
            return Movie.create(req.body).then((newMovie) => newMovie);
          })
          .then((movie) => {
            let exist = false;
            user.movies.forEach((m) => {
              if (m.imdbID == movie.imdbID) exist = true;
            });

            if (!exist) {
              user.movies.unshift(movie);
              user.save();
            }

            res.status(200).send(user.movies);
          });
      });
  },

  deleteUserMovie(req, res) {
    const movieId = req.body.imdbID;
    User.findById(req.user._id)
      .populate("movies")
      .then((user) => {
        user.movies.forEach((movie, index) => {
          if (movie.imdbID == movieId) {
            user.movies.splice(index, 1);
            user.save();
          }
        });
        res.status(200).send(user.movies);
      });
  },

  findAllUserMovies(req, res) {
    User.findById(req.user._id)
      .populate("movies")
      .then((user) => res.status(200).send(user.movies));
  },

  loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json("Por qué no llega este mensaje");
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).send(req.user);
      });
    })(req, res, next);
  },

  logoutUser(req, res) {
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

module.exports = usersControllers;
