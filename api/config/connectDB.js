import mysql from "mysql"
import {config} from "dotenv"
config()
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "weeb social"
}) 
db.connect(function(err){ 
    if (err)
    throw err;
    console.log("connection successful")
})





