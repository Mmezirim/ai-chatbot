import {db} from "../../config/connectDB.js"
import {authenticateUser} from "../../middlewares/verify.mjs"
import moment from "moment"


//API TO CREATE NEW POST
export const newPost = (req, res)=>{
    //CHECK FOR JWT
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO CREATE POST
        const q = "INSERT INTO posts (`userId`,`desc`, `img`,`video`, `tags`, `category`,`createdAt`) VALUES (?)"
        const values =[
            user.id,
            req.body.desc,
            req.body.img,
            req.body.video,
            req.body.tags,
            req.body.category,
            moment(Date.now()).format("YYYY-MM-DD HH:MM:SS")
        ]
        db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json("Post created successfully")
        })
    });
}

//API TO VIEW POST IN USER PROFILE
export const userPosts = (req, res) => {
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO GET POSTS
        const q = "SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p LEFT JOIN users AS u ON (u.id = p.userId) WHERE userId = ?";
        const id = req.params.id
        db.query(q, [id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
                return res.status(200).json(data);
        });
    });
};


//API TO VIEW POST IN FOLLOWING PAGE
export const followingPosts = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO GET POSTS
        const q = "SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN reach AS r ON (p.userId = r.followed) WHERE r.follower = ? OR p.userId = ?";
        db.query(q, [user.id, user.id], (err,data)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json(data)
        })
    }) 
}

//API TO VIEW POST IN FOR YOU PAGE
export const allPosts = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO GET POSTS
        const q = "SELECT * FROM posts AS p WHERE p.category = ?";
        const category = req.params.category;
        db.query(q, category, (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.category === 0){
            return res.status(404).json("Category doesn't exist")
        }
        else {
            return res.status(200).json(data)
        }
        })
    }) 
}

//API TO DELETE POST
export const deletePost = (req, res)=>{
    authenticateUser(req, res, () => {
        const user = req.user;
        //QUERY DB TO GET POSTS
        const q = "DELETE FROM posts WHERE id = ? AND userId = ?";

        db.query(q, [req.params.id, user.id], (err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0){
            res.status(200).json("Post deleted succesfully")
        }else{
            return res.status(403).json('You can only delete your post')
        }
        })
    }) 
}