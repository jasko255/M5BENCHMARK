
export const notFoundMiddlawere = (err, req, res, next) =>{
    if(err.status === 404){
        res.status(404).send(err.message)
    }else{
        next(err)
    }}

    export const badRequestMiddlawere = (err, req, res, next) =>{
        if(err.status === 400){
            res.status(400).send(err.errorsList)
        }else{
            next(err)
        }
}

export const catchErrorMiddleware = (err,req,res,next) => {
    console.log(err);
    res.status(500).send("Generic Server Errror")
}