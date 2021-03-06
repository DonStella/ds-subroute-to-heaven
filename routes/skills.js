const express = require("express");
const router = express.Router();

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

db.defaults({
  skills: [
    { id: "1", title: "Coding" },
    { id: "2", title: "Complaining" },
    { id: "3", title: "Procrastinating" },
    { id: "4", title: "Improving" },
    { id: "5", title: "Never giving up" },
  ],
}).write();

// routes for managing skills...
// move us away from here please...

router.get("/", (req, res) => {
  res.send(skills);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let skill = skills.find((skill) => skill.id == id);
  res.send(skill);
});

router.post("/", (req, res) => {
  if (!req.body.title) {
    return res.send({ error: "Please provide a title field!" });
  }
  let skillNew = { id: Date.now().toString(), ...req.body };
  skills.push(skillNew);
  res.send(skillNew);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  let skillToUpdate = skills.find((skill) => skill.id == id);
  Object.assign(skillToUpdate, { ...req.body });
  res.send(skillToUpdate);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let skill = skills.find((skill) => skill.id == id); // find item to delete
  skills = skills.filter((skill) => skill.id != id); // delete item by filtering it out
  res.send(skill); // return deleted item
});

// export our sub API
module.exports = router;
