import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js";

export const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer ","")  
    
        if(!token)
            throw new ApiError(400,"Unauthorized request")
    
        const decodedTokenInformation = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,)
    
        const user = await User.findById(decodedTokenInformation?._id).select("-password -refreshToken")
    
        if(!user)
            throw new ApiError(400,"invalid access token")
    
        req.user =user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
        
    }

})