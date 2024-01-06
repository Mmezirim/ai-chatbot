const express = require('express');
const route = express.Router();
const User = require('../models/userWaitlist');


route.post('waitlist/apply', (req, res)=>{
    const user = new User(req.body)
    user.save()
    .then((result)=>{
        res.status(200).json({meassage: 'Data saved sucessfully'});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error saving data'});
    })
})

module.exports = route;