require("./api/db");
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const chalk = require("chalk");
const routes = require("./api/routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./api/db/models");
const cors = require("cors");

// CORS MIDDLEWARE
app.use(cors());

// STATIC FILE SERVICE MIDDLEWARE
app.use(express.static(path.resolve(__dirname, "./public")));

// LOGGING MIDDLEWARE
app.use(morgan("tiny"));

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: "OMDB",
    resave: false,
    saveUninitialized: true,
  })
);

// CookieParser middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// DEFINIENDO ESTRATEGIA LOCAL DE AUTENTICACIÓN
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) return done(null, false, { message: "Incorrect email" });
          // user.hash(password, user.salt).then((hash) => {
          if (password !== user.password)
            return done(null, false, { message: "Incorrect password" });
          return done(null, user, { message: "User logged in" });
          // });
        })
        .catch(done);
    }
  )
);

// CONECTAR PASSPORT CON LAS SESSIONS CONFIGURADAS EN EXRESS
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user)) // req.user = user
    .catch(done);
});

// ROUTES MIDDLEWARE
app.use("/api", routes);

app.use("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () =>
  console.log(chalk.yellow("Server listenning on port"), chalk.bgYellow(PORT))
);
