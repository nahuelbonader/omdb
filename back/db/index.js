const chalk = require("chalk");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nahuelbonader:nahuelbonaderomdb@omdb.egtpu.mongodb.net/OMDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, chalk.red("connection error:")));
db.once("open", () => console.log(chalk.magenta("Database connected")));
