import express from "express";
import {newPost, allPosts, followingPosts, userPosts, deletePost} from "../controllers/feedInteractions/posts.js"

const router = express.Router()

router.post('/', newPost)
router.get('/:category', allPosts)
router.get('/', followingPosts)
router.get('/user/:id', userPosts)
router.delete('/:id', deletePost)


export default router