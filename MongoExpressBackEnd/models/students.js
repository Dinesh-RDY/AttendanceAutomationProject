const mongoose = require("mongoose");
const schema = mongoose.Schema;

const student = new schema({
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    // dept: {
    //     type: String,
    //     required: true,
    // },
    subjects: [{
        sid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        attendance: {
            type: Number,
            default: 0
        }
    }],
});
module.exports = mongoose.model("Student", student);