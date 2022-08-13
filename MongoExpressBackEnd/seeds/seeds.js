const mongoose = require("mongoose")
const Subject = require("../models/subjects");
mongoose.connect("mongodb://localhost:27017/attendance")
    .then(() => {
        console.log("DataBase Connected")
    }).catch(() => {
        console.log("Error connecting to database")
    })
const subjects = [{ "subject": "CN", credits: 4 },
{ subject: "CD", credits: 4 },
{ subject: "AI", credits: 3 },
{ subject: "OE", credits: 3 },
{ subject: "CC", credits: 3 },
{ subject: "CNLAB", credits: 2 },
{ subject: "CDLAB", credits: 2 }
]
const seeddb = async () => {
    await Subject.deleteMany({});
    console.log("Deletion successful")
    for (let i = 0; i < subjects.length; i++) {
        let newSubject = new Subject({ title: subjects[i]["subject"], credits: subjects[i]["credits"] })
        await newSubject.save();
    }
    console.log("Saving Succcessfull")
}

seeddb()