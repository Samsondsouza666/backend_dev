import mongoose from 'mongoose'

import { DB_NAME } from '../constant.js'

import { asyncHandler } from '../utils/asyncHandler.js'

// const connectDB = async() =>{
//     try{
//         const connectDBInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         console.log("mongoDB connected at",connectDBInstance.connection.host)

//     }
//     catch(err)
//     {
//         console.error("MONGODB CONNECTION FAILED!!",err)
//         process.exit(1)
//     }

// }

const connectDB  = asyncHandler(async ()=>{
    const connectDBInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("mongoDB connected at",connectDBInstance.connection.host)
})
export default connectDB