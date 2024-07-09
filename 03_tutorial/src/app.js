import express from 'express'

import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.static("public")) 

app.use(cookieParser())


///////////////////////////////  Router //////////////////////////////////////

import userRoute from './routes/user.routes.js'
app.use("/api/v1/users",userRoute)

//////////////////////////////
export {app}
