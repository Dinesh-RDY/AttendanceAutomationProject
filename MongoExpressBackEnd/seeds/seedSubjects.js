const mongoose = require("mongoose")
const schema = require("../models/subjects")
mongoose.connect("mongodb://localhost:27017/attendance")
    .then(
        () => {
            console.log("Db connected")
        }
    ).catch(() => {
        console.log("Could not connect ro database")
    })

const subjects = ["CN", "CD", "AI", "CC", "OE", "CDLAB", "CNLAB"]
const credits = [4, 4, 3, 3, 3, 2, 2]
async function seed() {
    for (let i = 0; i < subjects.length; i++) {
        const newSubject = new schema({ title: subjects[i], credits: credits[i] })
        await newSubject.save()
    }
}

seed()
    .then(() => { console.log("Finshed Saving"); return;  })
