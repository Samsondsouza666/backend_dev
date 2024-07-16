import mongoose,{Schema}  from "mongoose";

const subscriptionSchma = Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true,
})

export const Subscription = mongoose.model("Subscription",subscriptionSchma)

