const chalk = require("chalk");
const mongoose = require("mongoose");
const { MONGO_DB } = require("../../config");

mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.magenta("Database connected")))
  .catch((err) => console.error(chalk.red("connection error:"), err));

const db = mongoose.connection;
