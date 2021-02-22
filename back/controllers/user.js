const { User, Movie } = require("../db/models");

const usersControllers = {
  findAll(req, res) {
    User.find()
      .populate("movies")
      .then((users) => res.send(users))
      .catch((err) => res.status(404).send(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(201).send(user))
      .catch((err) => res.status(500).send(err));
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

  loginUser(req, res) {
    res.status(200).send(req.user);
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
