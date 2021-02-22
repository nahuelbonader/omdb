const { Movie } = require("../db/models");

const moviesControllers = {
  findAll(req, res) {
    Movie.find()
      .then((movies) => res.send(movies))
      .catch((err) => res.status(404).send(err));
  },

  // findOrCreateMovie(req, res) {
  //   Movie.findOne({ imdbID: req.body.imdbID })
  //     .then((movie) => {
  //       if (movie) return res.status(201).send(movie);
  //       Movie.create(req.body).then((movie) => res.status(201).send(movie));
  //     })
  //     .catch((err) => res.status(500).send(err));
  // },
};

module.exports = moviesControllers;
