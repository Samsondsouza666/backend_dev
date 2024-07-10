import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from 'path'

const registerUser = asyncHandler(async (req,res)=>{
    /*
        1. WE NEED USER DATA
        2. WE NEED TO VALIDATE THE USER DATA
        3. WE NEED TO USE MULTER TO STORE AVATAR LOCALLY
        4. WE NEED TO CHECK IF USER ALREADY REGISTERED
        5. WE NEED TO CHECK IF AVATAR HAS BEEN UPLOADED
        6. WE NEED TO UPLOAD AVATAR TO CLOUDINARY
        7. CREATE USER OBJECT - CREATE ENTRY IN DB
        8. REMOVE PASSWORD AND REFRESHTOKEN FROM OBJECT
        9. CHECK USER HAS BEEN CREATED
        10. SEND RESPONSE OBJECT TO THE USER
    */
    const  {username,email,fullname,password} = req.body


    if(
        [username,email,fullname,password].some(
            (fieldname)=> fieldname?.trim()===""
        )
    )
    {
        throw new ApiError(400,"all fields values are required")
    }

    const userExists = await User.findOne({
        $or : [{username},{email}]
    })
    if(userExists)
        throw new ApiError(400,"user already exists")
        // return res.status(400).json( new ApiResponse(400,userExists,"email or user already exits!!"))
    
    const avatarLocalPath = (req.files?.avatar[0]?.path);
    // const coverImageLocalPath = (req.files?.coverImage[0]?.path);
    let coverImageLocalPath;
    if(req.files && Array.isArray(res.files.coverImage) && req.files.coverImage.length > 0)
        coverImageLocalPath=req.files?.coverImage[0]?.path
    if(!avatarLocalPath)
        throw new ApiError(409,"avatar field is required!")
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    

    if(!avatar)
            throw new ApiError(400,"avatar field is required")

    const user = await User.create({
        fullname,
        avatar : avatar.url ,
        coverImage :coverImage.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "--password -refreshToken"
    )
    if(!createdUser)
        throw new ApiError(500,"something went wrong while registering the user")

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user has been successfully registered!")
    )







    res.status(200).json(
        {
            message:"ok"
        }
    )


})



export {registerUser}