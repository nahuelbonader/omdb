const chalk = require("chalk");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nahuelbonader:nahuelbonaderomdb@omdb.egtpu.mongodb.net/OMDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(chalk.magenta("Database connected")))
  .catch((err) => console.error(chalk.red("connection error:"), err));

const db = mongoose.connection;
    