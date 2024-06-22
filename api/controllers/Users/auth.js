import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {db} from "../../config/connectDB.js"
import {errorHandler} from "../../middlewares/errors.mjs"
import {config} from "dotenv"
config()

export const register = (req, res)=>{
    try{
        //QUERY DB TO CHECK FOR EXISTING CREDENTIALS
    const q = "SELECT * FROM users WHERE username = (?)"
    db.query(q, [req.body.username], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("Username exists!")
    })
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    //REGISTER USER
    const r = "INSERT INTO users (`email`, `username`, `nationality`, `password`, `coverPhoto`, `profilePic`, `bio`) VALUES(?)";
     const values = [
        req.body.email,
        req.body.username, 
        req.body.nationality,
        hashedPassword,
        req.body.coverPhoto,
        req.body.profilePic, 
        req.body.bio,
     ];
     db.query(r, [values], (err,data)=>{
        if(err)  throw err
        const payload = data.id
        const token = jwt.sign(payload, process.env.Secretkey);
        res.cookie('accessToken', token,{
            httpOnly: true
        }).status(200).json({message: "User created successfully"})
    })
    } catch (error) {
        // Throw error to be caught by the global error handler
        next(errorHandler);
    }
} 

export const login = (req, res)=>{
    //CHECK DATABASE FOR USER
    // Determine which field to search based on input
    let searchField;
    let value = [];
    if (req.body.username) {
        searchField = "u.username = ?";
        value = [req.body.username];
    } else if (req.body.email) {
        searchField = "u.email = ?";
        value = [req.body.email];
    } else {
        return res.status(400).json("Username/email is required");
    }
    const q = `SELECT * FROM users AS u WHERE ${searchField}`
        db.query(q, value, (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("Username/email not found!")
    
    //CONFIRM PASSWORD
    const confirmPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if(!confirmPassword) return res.status(400).json('Wrong password');
    const {password, ...others} = data[0]
    const token = jwt.sign({id: data[0].id}, process.env.Secretkey);
    res.cookie("accessToken", token,{
        httpOnly: true
    }).status(200).json(others)
    }) 
}

export const logout = (req, res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none"
    }).status(200).json("Logged out successfully")
}