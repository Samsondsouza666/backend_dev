
const asyncHandler = (requstHandler) => async (req,res,next) =>{

    try{
        await requstHandler(req,res,next)
    }
    catch(error)
    {
        // res.send(err.code || 500).json({
        //     success:false,
        //     message:err.msg
        // })
        console.log(error.message)
    }

} 
// const asyncHandler = (requestHandler)=>{
//     (req,res,next)=>{
//         new Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }
// } 
export {asyncHandler}