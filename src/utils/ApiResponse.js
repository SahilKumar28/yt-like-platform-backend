class ApiResponse{
    constructor(statuscode,data,message="Success"){
        this.statucode=statuscode
        this.data=data
        this.message=message
        this.success=statuscode<400
    }
}

export { ApiResponse }