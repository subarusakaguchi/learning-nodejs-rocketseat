const express = require("express");
const app = express();

app.use(express.json())

app.get("/courses", (req, res) => {
  const query = req.query
  console.log(query)
  let courses = ["Javascript", "HTML5", "CSS3"]
  return res.json({ courses });
});

app.post("/courses", (req, res) => {
  const body = req.body
  console.log(body)
  let courses = ["Javascript", "HTML5", "CSS3", "Bootstrap"]
  return res.json({ courses });
})

app.put("/courses/:id", (req, res) => {
  const { id } = req.params
  console.log(id)
  let courses = ["Node.JS", "HTML5", "CSS3", "Bootstrap"]
  return res.json({ courses });
})

app.patch("/courses/:id", (req, res) => {
  const { id } = req.params
  console.log(id)
  let courses = ["Node.JS", "HTML5", "Firebase", "Bootstrap"]
  return res.json({ courses });
})

app.delete("/courses/:id", (req, res) => {
  let courses = ["Node.JS", "Firebase", "Bootstrap"]
  return res.json({ courses });
})

app.listen(3000, () => console.log("Servidor está rodando na porta 3000"));
