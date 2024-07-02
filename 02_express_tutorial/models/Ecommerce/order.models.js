import mongoose from 'mongoose'


const orderItemsSchema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
    },
    quantity : {
        type : Number,
        required : true,
    }
})
const orderSchema = mongoose.Schema({
    orderPrice : {
        type : Number,
        required : true,
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    orderItems : {
        type : [orderItemsSchema]
    }
    ,
    address : {
         type : String,
         required : true,
    },
    status : {
        type : String,
        enum : ["PENDING","DELIVERED","CANCELLED"],
        default : "PENDING",
    }
},{timestamps:true})


export const  Order = mongoose.models("Order",orderSchema)
