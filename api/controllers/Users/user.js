import {db} from "../../config/connectDB.js"
import {authenticateUser} from "../../middlewares/verify.mjs"
import moment from "moment"


//API TO GET USER INFORMATION
export const viewProfile = (req, res)=>{
    //CHECK FOR JWT
    authenticateUser(req, res, () => {
        const user = req.user;
        const userId = req.params.id;
        //QUERY DB TO GET USER INFO
        const q = "SELECT * FROM users AS u WHERE id = ?"
        db.query(q, userId, (err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        const {password, ...userInfo} = data[0]
        return res.status(200).json(userInfo)
        })
    });
}

//API TO EDIT USER INFO
export const editProfile = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO INSERT NEW USER INFO
        const q = "INSERT INTO users ( `username`, `nationality`, `password`, `coverPhoto`, `profilePic`, `bio`) VALUES(?)";
        const values = [
            req.body.username, 
            req.body.nationality,
            req.body.password,
            req.body.coverPhoto,
            req.body.profilePic, 
            req.body.bio,
         ];
        db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json(data)
        })
    }) 
}

//API TO DELETE ACCOUNT
//export const deleteAccount = (req, res)=>{}  