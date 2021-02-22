import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:1337/`,
  // baseURL: `https://omdb-nb.herokuapp.com/`,
});

// const IMDB = axios.create({
//   baseURL: "https://www.omdbapi.com/",
// });

// IMDB.defaults.headers.common["Authorization"] = "4621e76e";

export { API };
