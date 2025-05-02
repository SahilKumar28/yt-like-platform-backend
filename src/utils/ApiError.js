class ApiError extends Error{
    constructor(statuscode,message="Something Went Wrong",error=[]){
        super(message)
        this.statuscode=statuscode
        this.message=message
        this.success=false;
        this.error=error
    }
}

export {ApiError}