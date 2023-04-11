const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema = require('./schema/student');
const cors=require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
    .then(() => { console.log('Successfully connected to the database') });

const Student = mongoose.model("Student", schema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.route('/students')
    .get((req, res) => {
        Student.find()
            .then(data => {
                if (data === null) {
                    res.status(500).send();
                }
                else {
                    res.send(data);
                }
            })
    })
    .post((req, res) => {
        const student = new Student({
            Name: req.body.name,
            Roll: req.body.roll,
            DOB: req.body.dob,
            Age: req.body.age
        })
        student.save()
        res.status(200).send();
    })
    .delete((req, res) => {
        Student.deleteMany()
            .then(() => res.status(200).send());
    })


app.route('/students/:id')
    .get((req, res) => {
        const parameter = req.params.id;
        Student.findOne({ Name: parameter })
            .then(data => {
                if (data === null) {
                    res.status(404).send();
                }
                else {
                    res.send(data);
                }
            });
    })
    .put((req, res) => {
        const parameter = req.params.id;
        Student.findOneAndReplace({ "Name": parameter }, {
            Name: req.body.name,
            Roll: req.body.roll,
            DOB: req.body.dob,
            Age: req.body.age
        })
            .then(() => res.status(200).send())

    })
    .patch((req, res) => {
        const parameter = req.params.id;
        if (Object.keys(req.body) === 0) {
            res.status(404).send();
        }
        else {
            Student.findOneAndUpdate({ "Name": parameter }, req.body)
                .then(() => res.status(200).send());
        }

    })
    .delete((req, res) => {
        const parameter = req.params.id;
        Student.deleteOne({ "Name": parameter })
            .then(() => res.status(200).send());
    })

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});