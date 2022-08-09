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
        id: mongoose.Schema.Types.ObjectId,
        attendance: {
            type: Number,
            default: 0
        }
    }],
});
module.exports = mongoose.model("Student", student);