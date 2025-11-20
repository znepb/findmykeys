const express = require("express");
const { readFile } = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
const posts = require("./posts.json").reverse();

app.get("/", (req, res) => {
  console.log("GET /");
  res.render("index", { posts });
});

app.get("/about", (req, res) => {
  console.log("GET /about");
  res.render("about");
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  res.render("login", { message: null });
});

app.post("/login", (req, res) => {
  console.log("POST /login", req.body);
  res.render("login", { message: "Incorrect username or password." });
});

app.get("/posts/:slug", (req, res) => {
  console.log("GET /posts/:slug", req.params.slug);
  const post = posts.find((p) => p.slug === req.params.slug);
  if (post) {
    res.render("post", { post });
  } else {
    res.status(404).render("404");
  }
});

app.get("/static/:filename", (req, res) => {
  console.log("GET /static", req.params.filename);
  const options = {
    root: __dirname + "/static/",
  };
  const fileName = req.params.filename;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      res.status(404).render("404");
    }
  });
});

app.get("/attachments", (req, res) => {
  console.log("GET /attachments", req.query.file);
  const fileName = req.query.file;
  const file = readFile(__dirname + "/attachments/" + fileName, (err, data) => {
    if (err) {
      res.status(404).render("404");
    } else {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );
      res.send(data);
    }
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
