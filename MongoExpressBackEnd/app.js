const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Subject = require("./models/subjects");
const Student = require("./models/students");
mongoose.connect("mongodb://localhost:27017/attendance").then(() => {
  console.log("connection Established ");
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/createSubject", async (req, res) => {
  console.log(req.body);
  const { name, credits } = req.body;
  let sub = await Subject.findOne({ title: name });
  if (sub) {
    return res.send("Subject already exists");
  }
  sub = new Subject({ title: name, credits: credits });
  await sub.save();
  return res.send("Subject created");
});

app.get("/attendance/:roll", async (req, res) => {
  const roll = req.params.roll;
  const user = await Student.findOne({ rollNumber: roll });
  res.send(JSON.stringify(user.subjects));
});

app.post("/subjectRegistration", async (req, res) => {
  const { roll, subject } = req.body;
  if (user.subjects.size() > 0) return;
  const user = await Student.findOne({ roll: roll });
  for (let sub in subject) {
    user.subjects[sub] = 0;
  }
  await user.save();
});
app.post("/markAttendance", async (req, res) => {
  /* const { roll, subject } = req.body;
    console.log(req.body)
    const user = await Student.findOne({ rollNumber: roll })
    for (let i = 0; i < user.subjects.length; i++) {
        if (subject == user.subjects[i]["_id"]) {
            user.subjects[i].attendance++;
            break;
        }
    }
    console.log(user.subjects)
    await user.save();
    res.send("Marked Attendance") */

  const { roll, subject } = req.body;
  const user = await Student.findOne({ rollNumber: roll });
  const sub = await Subject.findOne({ title: subject });
  try {
    for (let i = 0; i < user.subjects.length; i++) {
      if (String(sub._id) == user.subjects[i]["_id"]) {
        user.subjects[i].attendance++;
        break;
      }
    }
    await user.save();
    console.log(user);
  } catch (e) {
    res.status(404).send("Sorry user or subject not found");
  }

  res.send("Marked Attendance");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
