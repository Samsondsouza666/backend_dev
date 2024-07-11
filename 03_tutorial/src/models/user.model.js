import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const userSchema = Schema({
    username:{
        type: String,
        required:[true,"This field is required"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required:[true,"This field is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type: String,
        lowercase:true,
        trim:true,

    },
    avatar:{
        type: String,
        required:true,
    },
    coverImage:{
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:'Video'   
        }
    ],
    password:{
        type : String,
        required : [true,"Password is required!"]
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIREY,
    }
)
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIREY,
    }
)   
}

export const User = mongoose.model('User',userSchema)