import axios from "axios";

const IMDB = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// IMDB.defaults.headers.common["Authorization"] = "4621e76e";

export { IMDB };
