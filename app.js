const express = require("express");
const path = require("path");

const bramkiRoutes = require("./routes/bramkiRoutes");
const wejsciaRoutes = require("./routes/wejsciaRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewRoutes);
app.use("/bramki", bramkiRoutes);
app.use("/wejscia", wejsciaRoutes);

app.all("*", (req, res, next) => {
  next("URL incorrect");
});

module.exports = app;
