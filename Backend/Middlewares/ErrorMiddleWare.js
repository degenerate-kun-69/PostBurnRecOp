const errormiddleware=(err,req,res,next)=>{
    try {
        let error={...err};
        error.message=err.message;
        console.log(err);
       
//mongo bad object id error message
        if (err.name=='CastError'){
            const message=`Resource not found with id of ${err.value}`;
            error=new ErrorResponse(message,404);
        }

        //Mongo duplicate key 
        if (err.code==11000){
        const message=`Duplicate key value entered`;
        error = new Error(message);
        error.statusCode=400;
           

           }
           //Mongo validation error
           if (err.name=="ValidationError"){
        const message=`${Object.values(err.errors).map(value=>value.message)}`;   
        
        error = new Error(message.join
            (",")
        );
        error.statusCode=400;
        }
res.status(err.statusCode || 500).json({
    success:false,
    error:error.message,
    data:null,
 });    

    } catch (error) {
        next(error);
    }
}
export default errormiddleware;