const express = require("express");
const app = express();
var path = require("path");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.set("views", "./views");

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/", (req, res) => {
  console.log("Server request");
  console.log(req.url, req.method);
  const delay = randomInt(1000, 3000);
  const isError = Math.random() < 0.1;
  setTimeout(() => {
    if (isError) {
      const err = new Error("Internal Server Error");
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
      res.status(500);
      res.render("error.jade", {});
    } else {
      const responseTime = delay;
      res.render("index.jade", { responseTime });
      console.log(responseTime);
    }
  }, delay);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
