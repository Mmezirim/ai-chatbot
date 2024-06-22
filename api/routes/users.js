import express from "express";
import {viewProfile, editProfile} from "../controllers/Users/user.js"

const router = express.Router()

router.get('/:userId', viewProfile)
router.put('/:userId', editProfile)

export default router