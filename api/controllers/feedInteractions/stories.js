import {db} from "../../config/connectDB.js"
import {authenticateUser} from "../../middlewares/verify.mjs"
import moment from "moment"


//API TO CREATE NEW STORY
export const addStory = (req, res)=>{
    //CHECK FOR JWT
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO INSERT INTO STORY
        const q = "INSERT INTO stories (`img`, `text`,`video`,`userId`,`createdAt`) VALUES (?)"
        const values =[
            req.body.img,
            req.body.text,
            req.body.video,
            user.id,
            moment(Date.now()).format("YYYY-MM-DD HH:MM:SS")
        ]
        db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json("Story added successfully")
        })
    });
}

//API TO VIEW STORIES
export const viewStory = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        const postId = req.params.postId
        //QUERY DB TO GET COMMENTS
        const q = "SELECT s.*, u.id AS userId, username, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId)";
        db.query(q, (err,data)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json(data)
        })
    }) 
}

//STORY EXPIRATION FUNCTION
export default function deleteOldData() {
    const q = 'DELETE FROM stories WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY)    ';
    db.query(q, (err, result) => {
      if (err){
        res.status(500).json("Internal server error")
      }else{
        return  res.status(200).json("Story deleted succesfully")
      }
    });
}

// Schedule deletion of old data every 24 hours
setInterval(deleteOldData, 24 * 60 * 60 * 1000);  

//API TO DELETE STORY
export const deleteStory = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        const storyId = req.params.storyId
        //QUERY DB TO DELETE STORY
        const q = "DELETE FROM stories WHERE id = ? AND userId = ?";

        db.query(q, [storyId, user.id], (err,data)=>{
        if(err) {
            return res.status(500).json(err)
        }
        if(data){
            res.status(200).json("Story deleted succesfully")
        }else{
            res.status(409).json("You can only delete your own story")
        }
        })
    }) 
}