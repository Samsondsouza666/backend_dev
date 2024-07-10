// console.log(1)

// require('dotenv').config({path:'./env'})
import { } from "dotenv/config.js"
import connectDB from './db/index.js'
import {app} from "./app.js"

const PORT = process.env.PORT || 8000
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error(`ERROR : ${error}`)
        process.exit(1)
    })
    app.listen(PORT,()=>{
        console.log(`server is running on port:${PORT}`)
    })
})
.catch((err)=>{
    console.error("ERROR: ",err)
})






// import { upload } from "./   middlewares/multer.middleware.js"

// upload.single('avatar')