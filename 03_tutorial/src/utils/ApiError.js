class ApiError extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        errors =[],
        stack= ""
    )
    {
        this.super(message)
        this.data =null
        this.statusCode = statusCode
        this.message =message
        this.error = errors
        this.success = false
        if(stack)
        {
            this.stack = stack 
        }
        else
        {
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}