const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("server started");
});
