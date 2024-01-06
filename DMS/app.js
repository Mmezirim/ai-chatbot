const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospitals = require('./models/newHospital');
const User = require('./models/userWaitlist');
const Doctors = require('./models/doctors');
const UserRoutes = require('./routes/users');
const app = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(UserRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected to database'))
    .catch((err)=>
    console.log(err));
    

app.post('/apply', (req, res)=>{
    const user = new User(req.body)
    user.save()
    .then(() =>{
        res.status(200).json({message: 'Data saved sucessfully'});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error saving data'});
    })
})    

const port = 3000;

app.listen(port, (req, res)=>{
    console.log('Your server is up and running')
});