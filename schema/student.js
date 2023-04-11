const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    Name: String,
    Roll: String,
    DOB: String,
    Age: Number
});

module.exports = studentSchema;